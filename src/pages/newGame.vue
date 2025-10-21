<template>
  <div class="q-pa-md">
    <div class="text-h6">Create a New Game</div>
    <q-input
      square
      class="q-mt-md"
      label="Game Title"
      v-model="gameTitle"
    />
    <q-input
      square
      class="q-mt-md"
      style="width: 40%"
      label="Minimum Players"
      v-model="minPlayers"
    />
  </div>
  <BottomBar
    :confirm-label="route.query.from === 'newInstance' ? 'Add and Continue' : 'Add to Library'"
    :cancel-label="route.query.from === 'newInstance' ? 'Go Back' : 'Cancel'"
    @cancel="onCancel"
    @confirm="onConfirm"
  />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BottomBar from '../components/BottomBar.vue'

// local form state
const gameTitle = ref('')
const minPlayers = ref('')

const router = useRouter()
const route = useRoute()
function onCancel() {
  // NULL COALESCING kinda
  // appends query location if it exists, otherwise home page
  router.push({ path: `/${route.query?.from ?? ''}` })
}

function onConfirm() {
  //save new game here
  // If we were opened from newInstance, go back there with the new game in query
  if (route.query.from === 'newInstance') {
    router.push({ path: '/newInstance', query: { newGame: String(gameTitle.value) } })
  } else {
    router.push('/')
  }
}
</script>
