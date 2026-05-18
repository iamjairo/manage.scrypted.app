<template>
  <div ref="el" class="term"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const el = ref<HTMLDivElement>();
const id = crypto.randomUUID();
let term: Terminal; let fit: FitAddon;

onMounted(async () => {
  term = new Terminal({ fontSize: 12, cursorBlink: true });
  fit = new FitAddon(); term.loadAddon(fit);
  term.open(el.value!); fit.fit();

  await window.scrypted.term.open(id, term.cols, term.rows);
  window.scrypted.term.onData(id, (d) => term.write(d));
  term.onData((d) => window.scrypted.term.write(id, d));
  term.onResize(({ cols, rows }) => window.scrypted.term.resize(id, cols, rows));

  window.addEventListener('resize', () => { fit.fit(); });
});

onBeforeUnmount(() => { window.scrypted.term.close(id); term?.dispose(); });
</script>

<style scoped>
.term { height: 260px; background: #000; padding: 4px; border-radius: 6px; }
</style>