<template>
  <div ref="el" class="logs"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const el = ref<HTMLDivElement>();
let term: Terminal; let fit: FitAddon;

onMounted(async () => {
  term = new Terminal({ convertEol: true, disableStdin: true, fontSize: 12 });
  fit = new FitAddon(); term.loadAddon(fit);
  term.open(el.value!); fit.fit();
  window.scrypted.onLog((chunk) => term.write(chunk));
  await window.scrypted.startLogs();
  window.addEventListener('resize', () => fit.fit());
});

onBeforeUnmount(() => { window.scrypted.stopLogs(); term?.dispose(); });
</script>

<style scoped>
.logs { height: 280px; background: #000; padding: 4px; border-radius: 6px; }
</style>