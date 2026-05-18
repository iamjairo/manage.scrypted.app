<template>
  <v-card class="pa-4">
    <div class="d-flex align-center justify-space-between">
      <div>
        <div class="text-h6">Scrypted Server</div>
        <div class="text-caption text-medium-emphasis">
          {{ ip }}:10443
        </div>
      </div>
      <v-switch
        :model-value="running"
        color="success"
        hide-details
        :loading="busy"
        @update:model-value="toggle"
      />
    </div>
    <v-chip class="mt-2" :color="running ? 'success' : 'grey'" size="small">
      {{ status }}
    </v-chip>
    <v-btn class="ml-2 mt-2" size="small" variant="text" :href="`https://${ip}:10443`" target="_blank">
      Open UI
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const status = ref<'running' | 'stopped' | 'missing'>('stopped');
const ip = ref('127.0.0.1');
const busy = ref(false);
const running = computed(() => status.value === 'running');

async function refresh() {
  status.value = await window.scrypted.status();
  ip.value = await window.scrypted.ip();
}

async function toggle(on: boolean) {
  busy.value = true;
  try { on ? await window.scrypted.start() : await window.scrypted.stop(); }
  finally { busy.value = false; await refresh(); }
}

onMounted(() => { refresh(); setInterval(refresh, 3000); });
import { computed } from 'vue';
</script>