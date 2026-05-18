use bollard::container::{
    Config, CreateContainerOptions, LogOutput, LogsOptions, StartContainerOptions,
    StopContainerOptions,
};
use bollard::image::CreateImageOptions;
use bollard::models::{
    ContainerStateStatusEnum, HostConfig, RestartPolicy, RestartPolicyNameEnum,
};
use bollard::Docker;
use futures_util::StreamExt;
use tokio::task::JoinHandle;

const CONTAINER_NAME: &str = "scrypted";
const IMAGE: &str = "ghcr.io/koush/scrypted:latest";

fn docker() -> Result<Docker, String> {
    Docker::connect_with_local_defaults().map_err(|e| e.to_string())
}

pub async fn status() -> Result<&'static str, String> {
    let docker = docker()?;
    match docker.inspect_container(CONTAINER_NAME, None).await {
        Ok(info) => {
            let running = info
                .state
                .and_then(|s| s.status)
                .map(|s| s == ContainerStateStatusEnum::RUNNING)
                .unwrap_or(false);
            Ok(if running { "running" } else { "stopped" })
        }
        Err(bollard::errors::Error::DockerResponseServerError {
            status_code: 404, ..
        }) => Ok("missing"),
        Err(e) => Err(e.to_string()),
    }
}

pub async fn ensure_container() -> Result<(), String> {
    let docker = docker()?;

    // Pull image if not present
    let mut pull_stream = docker.create_image(
        Some(CreateImageOptions {
            from_image: IMAGE,
            ..Default::default()
        }),
        None,
        None,
    );
    while let Some(result) = pull_stream.next().await {
        result.map_err(|e| e.to_string())?;
    }

    let home = std::env::var("HOME").unwrap_or_else(|_| "/root".into());
    let bind = format!("{}/.scrypted/volume:/server/volume", home);

    let config: Config<String> = Config {
        image: Some(IMAGE.to_string()),
        host_config: Some(HostConfig {
            network_mode: Some("host".into()),
            restart_policy: Some(RestartPolicy {
                name: Some(RestartPolicyNameEnum::UNLESS_STOPPED),
                maximum_retry_count: None,
            }),
            binds: Some(vec![bind]),
            ..Default::default()
        }),
        ..Default::default()
    };

    docker
        .create_container(
            Some(CreateContainerOptions {
                name: CONTAINER_NAME,
                platform: None,
            }),
            config,
        )
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

pub async fn start() -> Result<(), String> {
    let docker = docker()?;

    // Ensure container exists first
    if status().await? == "missing" {
        ensure_container().await?;
    }

    match docker
        .start_container(CONTAINER_NAME, None::<StartContainerOptions<String>>)
        .await
    {
        Ok(_) => Ok(()),
        Err(bollard::errors::Error::DockerResponseServerError {
            status_code: 304, ..
        }) => Ok(()), // already started
        Err(e) => Err(e.to_string()),
    }
}

pub async fn stop() -> Result<(), String> {
    let docker = docker()?;
    match docker
        .stop_container(
            CONTAINER_NAME,
            Some(StopContainerOptions { t: 10 }),
        )
        .await
    {
        Ok(_) => Ok(()),
        Err(bollard::errors::Error::DockerResponseServerError {
            status_code: 304, ..
        }) => Ok(()), // already stopped
        Err(bollard::errors::Error::DockerResponseServerError {
            status_code: 404, ..
        }) => Ok(()), // doesn't exist
        Err(e) => Err(e.to_string()),
    }
}

pub async fn stream_logs<F>(emit: F) -> Result<JoinHandle<()>, String>
where
    F: Fn(String) + Send + 'static,
{
    let docker = docker()?;
    let options = Some(LogsOptions::<String> {
        follow: true,
        stdout: true,
        stderr: true,
        tail: "100".into(),
        ..Default::default()
    });

    let mut log_stream = docker.logs(CONTAINER_NAME, options);

    let handle = tokio::spawn(async move {
        while let Some(result) = log_stream.next().await {
            match result {
                Ok(LogOutput::StdOut { message } | LogOutput::StdErr { message }) => {
                    let line = String::from_utf8_lossy(&message).to_string();
                    emit(line);
                }
                Ok(_) => {}
                Err(_) => break,
            }
        }
    });

    Ok(handle)
}
