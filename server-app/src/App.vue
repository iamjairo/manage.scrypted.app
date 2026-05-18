<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-4">
        <v-row>
          <v-col cols="12" md="4">
            <StatusPanel />
          </v-col>
          <v-col cols="12" md="8">
            <LogStream />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <MiniTerminal />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import LogStream from './components/LogStream.vue';
import MiniTerminal from './components/MiniTerminal.vue';
import StatusPanel from './components/StatusPanel.vue';
</script>
