<template>
  <v-card>
    <v-card-title class="d-flex align-center justify-space-between">
      <span>Scrypted Server</span>
      <v-chip :color="chipColor" size="small" variant="flat">{{ status }}</v-chip>
    </v-card-title>

    <v-card-text>
      <div class="text-body-2 mb-2">Host LAN IP: <strong>{{ ip }}</strong></div>
      <div class="text-body-2 mb-4">URL: <strong>{{ url }}</strong></div>

      <v-switch
        v-model="enabled"
        :loading="busy"
        :disabled="busy"
        inset
        color="primary"
        label="Container Running"
        @update:model-value="toggleContainer"
      />

      <v-btn color="secondary" variant="tonal" block @click="openUi">Open UI</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

type ServiceStatus = 'running' | 'stopped' | 'missing';

const status = ref<ServiceStatus>('missing');
const ip = ref('127.0.0.1');
const busy = ref(false);
let timer: number | undefined;

const enabled = computed({
  get: () => status.value === 'running',
  set: () => undefined,
});

const chipColor = computed(() => {
  if (status.value === 'running') {
    return 'success';
  }

  if (status.value === 'stopped') {
    return 'warning';
  }

  return 'error';
});

const url = computed(() => `https://${ip.value}:10443`);

async function refresh() {
  status.value = await window.scrypted.status();
  ip.value = await window.scrypted.ip();
}

async function toggleContainer(nextValue: boolean | null) {
  if (nextValue === null) {
    return;
  }

  busy.value = true;

  try {
    status.value = nextValue ? await window.scrypted.start() : await window.scrypted.stop();
  } finally {
    busy.value = false;
  }
}

function openUi() {
  window.open(url.value, '_blank', 'noopener');
}

onMounted(async () => {
  await refresh();
  timer = window.setInterval(() => {
    void refresh();
  }, 3000);
});

onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});
</script>
