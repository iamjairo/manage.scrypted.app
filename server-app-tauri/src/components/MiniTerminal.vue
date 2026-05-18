<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-console</v-icon>
      Terminal
      <v-spacer />
      <v-btn
        v-if="!open"
        icon="mdi-play"
        variant="text"
        density="compact"
        @click="openTerminal"
      />
      <v-btn
        v-else
        icon="mdi-close"
        variant="text"
        density="compact"
        @click="closeTerminal"
      />
    </v-card-title>

    <v-card-text class="pa-0">
      <div ref="termEl" class="term-container" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { scrypted } from '../api';
import type { UnlistenFn } from '@tauri-apps/api/event';

const termEl = ref<HTMLDivElement | null>(null);
const open = ref(false);

let term: Terminal | null = null;
let fitAddon: FitAddon | null = null;
let sessionId = '';
let unlistenData: UnlistenFn | null = null;
let unlistenExit: UnlistenFn | null = null;

async function openTerminal() {
  if (!termEl.value) return;

  sessionId = crypto.randomUUID();

  const t = new Terminal({ theme: { background: '#0d1117', foreground: '#c9d1d9' } });
  const fa = new FitAddon();
  t.loadAddon(fa);
  t.open(termEl.value);
  fa.fit();

  t.onData((data) => {
    scrypted.term.write(sessionId, data).catch(() => {});
  });

  term = t;
  fitAddon = fa;

  try {
    unlistenData = await scrypted.term.onData(sessionId, (chunk) => {
      t.write(chunk);
    });
    unlistenExit = await scrypted.term.onExit(sessionId, () => {
      open.value = false;
      t.write('\r\n[Process exited]\r\n');
    });

    const { cols, rows } = t;
    await scrypted.term.open(sessionId, cols, rows);
    open.value = true;
  } catch (e) {
    t.write(`\r\n[Error: ${e}]\r\n`);
  }
}

async function closeTerminal() {
  try {
    await scrypted.term.close(sessionId);
  } finally {
    cleanup();
  }
}

function cleanup() {
  unlistenData?.();
  unlistenExit?.();
  unlistenData = null;
  unlistenExit = null;
  term?.dispose();
  term = null;
  fitAddon = null;
  open.value = false;
}

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
  if (open.value) {
    scrypted.term.close(sessionId).catch(() => {});
  }
  cleanup();
});

function onResize() {
  if (!fitAddon || !term || !open.value) return;
  fitAddon.fit();
  scrypted.term.resize(sessionId, term.cols, term.rows).catch(() => {});
}
</script>

<style scoped>
.term-container {
  height: 320px;
  background: #0d1117;
  padding: 4px;
}
</style>
