<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2">mdi-text-box-outline</v-icon>
      Docker Logs
      <v-spacer />
      <v-btn
        v-if="!streaming"
        icon="mdi-play"
        variant="text"
        density="compact"
        @click="startStream"
      />
      <v-btn
        v-else
        icon="mdi-stop"
        variant="text"
        density="compact"
        @click="stopStream"
      />
      <v-btn
        icon="mdi-delete-sweep"
        variant="text"
        density="compact"
        @click="clearLogs"
      />
    </v-card-title>

    <v-card-text class="pa-0">
      <div
        ref="logContainer"
        class="log-output"
      >
        <div v-for="(line, i) in lines" :key="i" class="log-line">{{ line }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, nextTick, onUnmounted } from 'vue';
import { scrypted } from '../api';
import type { UnlistenFn } from '@tauri-apps/api/event';

const MAX_LINES = 5000;

const lines = ref<string[]>([]);
const streaming = ref(false);
const logContainer = ref<HTMLDivElement | null>(null);
let unlisten: UnlistenFn | null = null;

async function startStream() {
  if (streaming.value) return;
  streaming.value = true;
  try {
    unlisten = await scrypted.onLog((line) => {
      lines.value.push(line);
      // Ring buffer: evict oldest lines when over the cap
      if (lines.value.length > MAX_LINES) {
        lines.value.splice(0, lines.value.length - MAX_LINES);
      }
      nextTick(() => {
        if (logContainer.value) {
          logContainer.value.scrollTop = logContainer.value.scrollHeight;
        }
      });
    });
    await scrypted.startLogs();
  } catch (e) {
    streaming.value = false;
  }
}

async function stopStream() {
  try {
    await scrypted.stopLogs();
  } finally {
    unlisten?.();
    unlisten = null;
    streaming.value = false;
  }
}

function clearLogs() {
  lines.value = [];
}

onUnmounted(() => {
  if (streaming.value) {
    scrypted.stopLogs().catch(() => {});
  }
  unlisten?.();
});
</script>

<style scoped>
.log-output {
  background: #0d1117;
  color: #c9d1d9;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  height: 280px;
  overflow-y: auto;
  padding: 8px 12px;
}
.log-line {
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 1.5;
}
</style>
