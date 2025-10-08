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
  <BottomBar
    confirm-label="Add to Library"
    @cancel="onCancel"
    @confirm="onConfirm"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BottomBar from '../components/BottomBar.vue'

// local form state
const gameTitle = ref('')
const minPlayers = ref('')

const router = useRouter()
function onCancel() {
  router.push('/')
}

function onConfirm() {
  //save new game here
  router.push('/newInstance')
}
</script>
