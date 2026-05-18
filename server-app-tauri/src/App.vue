<template>
  <v-app theme="dark">
    <v-app-bar flat color="surface" border="b">
      <v-app-bar-title>
        <v-icon icon="mdi-server" class="mr-2" />
        Scrypted Server
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-4">
        <v-row>
          <v-col cols="12">
            <StatusPanel />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
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
import StatusPanel from './components/StatusPanel.vue';
import LogStream from './components/LogStream.vue';
import MiniTerminal from './components/MiniTerminal.vue';
</script>
