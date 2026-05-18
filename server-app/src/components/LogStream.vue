<template>
  <v-card>
    <v-card-title>Server Logs</v-card-title>
    <v-card-text>
      <div ref="terminalEl" class="log-terminal"></div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const terminalEl = ref<HTMLElement>();

let term: Terminal | undefined;
let fit: FitAddon | undefined;
let stopLogListener: (() => void) | undefined;
let resizeHandler: (() => void) | undefined;

onMounted(async () => {
  term = new Terminal({
    disableStdin: true,
    convertEol: true,
    cursorBlink: false,
    theme: {
      background: '#111111',
    },
  });

  fit = new FitAddon();
  term.loadAddon(fit);

  if (!terminalEl.value) {
    return;
  }

  term.open(terminalEl.value);
  fit.fit();

  stopLogListener = window.scrypted.onLog((chunk) => {
    term?.write(chunk);
  });

  resizeHandler = () => {
    fit?.fit();
  };

  window.addEventListener('resize', resizeHandler);
  await window.scrypted.startLogs();
});

onUnmounted(() => {
  stopLogListener?.();
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  void window.scrypted
    .stopLogs()
    .catch((error: unknown) => console.error('Failed to stop log stream', error));
  term?.dispose();
});
</script>

<style scoped>
.log-terminal {
  height: 310px;
  width: 100%;
}
</style>
