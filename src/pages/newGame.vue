<template>
  <div class="q-pa-md">
    <div class="text-h6">Create a New Game</div>
    <q-input
      standout
      class="q-mt-md"
      label="Game Title"
      v-model="gameTitle"
    />
    <q-input
      standout
      class="q-mt-md"
      style="width: 40%"
      label="Minimum Players"
      v-model="minPlayers"
    />
  </div>
  <q-separator />
  <div class="row justify-between">
    <q-btn
      label="Cancel"
      icon="sym_s_cancel"
      color="negative"
      flat
      @click="$router.push('/')"
    />
    <q-btn
      label="Add Game To Library"
      icon="sym_s_arrow_forward"
      color="positive"
      flat
      @click="$router.push('/newInstance')"
    />
  </div>
</template>

<script setup></script>
