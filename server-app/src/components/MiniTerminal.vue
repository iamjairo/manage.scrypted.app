<template>
  <v-card>
    <v-card-title>Mini Terminal</v-card-title>
    <v-card-text>
      <div ref="terminalEl" class="mini-terminal"></div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const terminalEl = ref<HTMLElement>();
const sessionId = crypto.randomUUID();

let term: Terminal | undefined;
let fit: FitAddon | undefined;
let unbindData: (() => void) | undefined;
let unbindExit: (() => void) | undefined;
let resizeHandler: (() => void) | undefined;

onMounted(async () => {
  term = new Terminal({
    cursorBlink: true,
    convertEol: true,
    fontSize: 13,
    theme: {
      background: '#0d0d0d',
    },
  });

  fit = new FitAddon();
  term.loadAddon(fit);

  if (!terminalEl.value) {
    return;
  }

  term.open(terminalEl.value);
  fit.fit();

  await window.scrypted.term.open(sessionId);

  unbindData = window.scrypted.term.onData((id, data) => {
    if (id === sessionId) {
      term?.write(data);
    }
  });

  unbindExit = window.scrypted.term.onExit((id, exitCode) => {
    if (id === sessionId) {
      term?.writeln(`\r\n[process exited: ${exitCode}]`);
    }
  });

  term.onData((data) => {
    void window.scrypted.term.write(sessionId, data);
  });

  const fitAndResize = () => {
    fit?.fit();
    if (term) {
      void window.scrypted.term.resize(sessionId, term.cols, term.rows);
    }
  };

  fitAndResize();
  resizeHandler = fitAndResize;
  window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
  unbindData?.();
  unbindExit?.();
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
  }
  void window.scrypted.term
    .close(sessionId)
    .catch((error: unknown) => console.error('Failed to close terminal session', error));
  term?.dispose();
});
</script>

<style scoped>
.mini-terminal {
  height: 330px;
  width: 100%;
}
</style>
