mod docker;
mod net;
mod pty;

use std::sync::Arc;
use tauri::{AppHandle, Emitter, State};
use tokio::sync::Mutex;
use tokio::task::JoinHandle;

// ─── State ──────────────────────────────────────────────────────────────────

struct LogHandle(Option<JoinHandle<()>>);

type LogState = Arc<Mutex<LogHandle>>;

// ─── Service commands ────────────────────────────────────────────────────────

#[tauri::command]
async fn svc_status() -> Result<&'static str, String> {
    docker::status().await
}

#[tauri::command]
async fn svc_start() -> Result<(), String> {
    docker::start().await
}

#[tauri::command]
async fn svc_stop() -> Result<(), String> {
    docker::stop().await
}

#[tauri::command]
fn svc_ip() -> String {
    net::lan_ip()
}

// ─── Log-stream commands ─────────────────────────────────────────────────────

#[tauri::command]
async fn logs_start(app: AppHandle, state: State<'_, LogState>) -> Result<(), String> {
    let mut guard = state.lock().await;
    // Only reuse an existing handle if the task is still running.
    // A finished handle (e.g., Docker error or container gone) must be replaced.
    if guard.0.as_ref().map(|h| !h.is_finished()).unwrap_or(false) {
        return Ok(()); // already streaming
    }
    guard.0 = None; // clear any finished handle
    let handle = docker::stream_logs(move |line| {
        let _ = app.emit("logs:data", line);
    })
    .await?;
    guard.0 = Some(handle);
    Ok(())
}

#[tauri::command]
async fn logs_stop(state: State<'_, LogState>) -> Result<(), String> {
    let mut guard = state.lock().await;
    if let Some(handle) = guard.0.take() {
        handle.abort();
    }
    Ok(())
}

// ─── PTY commands ────────────────────────────────────────────────────────────

#[tauri::command]
fn term_open(app: AppHandle, id: String, cols: u16, rows: u16) -> Result<(), String> {
    pty::open(app, id, cols, rows)
}

#[tauri::command]
fn term_write(id: String, data: String) -> Result<(), String> {
    pty::write(&id, &data)
}

#[tauri::command]
fn term_resize(id: String, cols: u16, rows: u16) -> Result<(), String> {
    pty::resize(&id, cols, rows)
}

#[tauri::command]
fn term_close(id: String) -> Result<(), String> {
    pty::close(&id)
}

// ─── Entry point ─────────────────────────────────────────────────────────────

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let log_state: LogState = Arc::new(Mutex::new(LogHandle(None)));

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .manage(log_state)
        .invoke_handler(tauri::generate_handler![
            svc_status,
            svc_start,
            svc_stop,
            svc_ip,
            logs_start,
            logs_stop,
            term_open,
            term_write,
            term_resize,
            term_close,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
