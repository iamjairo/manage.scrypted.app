<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <v-icon :color="statusColor" class="mr-2">mdi-circle</v-icon>
      Scrypted Container
      <v-spacer />
      <v-chip v-if="ip" color="info" variant="outlined" size="small">
        <v-icon start>mdi-lan</v-icon>
        {{ ip }}
      </v-chip>
    </v-card-title>

    <v-card-subtitle class="text-capitalize">
      Status: {{ status ?? 'checking…' }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="success"
        variant="tonal"
        :disabled="status === 'running' || loading"
        :loading="loading && pendingAction === 'start'"
        prepend-icon="mdi-play"
        @click="startContainer"
      >
        Start
      </v-btn>
      <v-btn
        color="error"
        variant="tonal"
        :disabled="status !== 'running' || loading"
        :loading="loading && pendingAction === 'stop'"
        prepend-icon="mdi-stop"
        @click="stopContainer"
      >
        Stop
      </v-btn>
      <v-spacer />
      <v-btn
        icon="mdi-refresh"
        variant="text"
        :loading="loading && pendingAction === 'refresh'"
        @click="refresh"
      />
    </v-card-actions>

    <v-snackbar v-model="snack.show" :color="snack.color" :timeout="3000">
      {{ snack.text }}
    </v-snackbar>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { scrypted } from '../api';
import type { ContainerStatus } from '../types/scrypted';

const status = ref<ContainerStatus | null>(null);
const ip = ref<string>('');
const loading = ref(false);
const pendingAction = ref<'start' | 'stop' | 'refresh' | null>(null);
const snack = ref({ show: false, text: '', color: 'error' });

const statusColor = computed(() => {
  if (status.value === 'running') return 'success';
  if (status.value === 'stopped') return 'warning';
  if (status.value === 'missing') return 'error';
  return 'grey';
});

async function refresh() {
  loading.value = true;
  pendingAction.value = 'refresh';
  try {
    status.value = await scrypted.status();
    ip.value = await scrypted.ip();
  } catch (e) {
    showError(e);
  } finally {
    loading.value = false;
    pendingAction.value = null;
  }
}

async function startContainer() {
  loading.value = true;
  pendingAction.value = 'start';
  try {
    await scrypted.start();
    status.value = 'running';
  } catch (e) {
    showError(e);
  } finally {
    loading.value = false;
    pendingAction.value = null;
  }
}

async function stopContainer() {
  loading.value = true;
  pendingAction.value = 'stop';
  try {
    await scrypted.stop();
    status.value = 'stopped';
  } catch (e) {
    showError(e);
  } finally {
    loading.value = false;
    pendingAction.value = null;
  }
}

function showError(e: unknown) {
  snack.value = {
    show: true,
    text: e instanceof Error ? e.message : String(e),
    color: 'error',
  };
}

onMounted(refresh);
</script>
