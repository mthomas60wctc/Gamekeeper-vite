<template>
  <div class="q-pa-lg q-gutter-lg">
    <div class="row q-gutter-md items-end">
      <q-select
        filled
        v-model="gameSelected"
        use-input
        input-debounce="0"
        label="Game"
        :options="games"
        @filter="filterFn"
        style="width: 300px"
        behavior="menu"
        clearable
        color="red"
        class="col-grow"
        dropdown-icon="sym_s_arrow_drop_down"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No matching game - Create a new game!</q-item-section>
          </q-item>
        </template>
      </q-select>
      
      <q-btn
        icon="sym_s_add"
        label="New Game"
        color="red"
        class="q-mb-sm"
      @click="$router.push('/newGame')"
      />
    </div>
    <div v-if="selectedPlayers.length" class="q-mt-lg">
      <div class="text-subtitle2 q-mb-sm">Selected Players:</div>
      <div class="q-gutter-sm">
        <q-chip
          v-for="player in selectedPlayers"
          :key="player"
          removable
          square
          icon-remove="sym_s_cancel"
          @remove="removePlayer(player)"
          :color="chipColors[selectedPlayers.indexOf(player)]"
          text-color="white"
          icon="sym_s_person"
        >
          {{ player }}
        </q-chip>
      </div>
    </div>
    <div v-if="availablePlayers.length" class="q-mt-lg">
      <div class="text-subtitle2 q-mb-sm">Available Players:</div>
      <div class="q-gutter-sm">
        <q-chip
          v-for="player in availablePlayers"
          :key="player"
          clickable
          square
          @click="addPlayer(player)"
          color="grey-4"
          text-color="dark"
          icon="sym_s_person_add"
        >
          {{ player }}
        </q-chip>
      </div>
    </div>

  <q-separator />
  </div>
  <div class="row justify-between">
    <q-btn
      label="Reset Form"
      icon="sym_s_refresh"
      color="amber-14"
      flat
      @click="resetForm"
    />
    <q-btn
      label="Start Game"
      icon="sym_s_play_arrow"
      color="red"
      unelevated
      flat
      @click="startGame"
      :disable="!gameSelected || selectedPlayers.length === 0"
    />
  </div>
</template>

<script setup>
//todo: add new player button + functionality
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const gameSelected = ref(null)
const chipColors = ref([])
const selectedPlayers = ref([])
const newGameName = ref('')

const availablePlayers = computed(() => {
  return playersFull.filter((player) => !selectedPlayers.value.includes(player))
})

const playersFull = [
  'Alice',
  'Bob',
  'Charlie',
  'Diana',
  'Eve',
  'Frank',
  'Grace',
  'Hannah',
  'Ivan',
  'Judy',
]

const gamesFull = [
  'Chess',
  'Monopoly',
  'Poker',
  'Scrabble',
  'Uno',
  'Settlers of Catan',
  'Risk',
  'Clue',
  'Codenames',
  'Carcassonne',
  'Ticket to Ride',
  'Go Fish',
  'Spades',
  'Hearts',
  'Bridge',
  'Dominoes',
  'Checkers',
  'Pandemic',
  'Exploding Kittens',
  'Sequence',
]

const games = ref([...gamesFull])

function filterFn(val, update) {
  if (val === '') {
    update(() => {
      games.value = gamesFull
    })
    return
  }
  update(() => {
    const needle = val.toLowerCase()
    games.value = gamesFull.filter((v) => v.toLowerCase().indexOf(needle) > -1)
  })
}

function addPlayer(player) {
  if (!selectedPlayers.value.includes(player)) {
    selectedPlayers.value.push(player)
    chipColors.value.push(getRandomColor())
  }
}

function removePlayer(player) {
  const index = selectedPlayers.value.indexOf(player)
  if (index > -1) {
    selectedPlayers.value.splice(index, 1)
    const color = chipColors.value[index]
    chipColors.value.splice(index, 1)
    usedColors.value.delete(color)
  }
}

function resetForm() {
  gameSelected.value = null
  selectedPlayers.value = []
  chipColors.value = []
  usedColors.value.clear()
  newGameName.value = ''
}

function startGame() {
  if (gameSelected.value && selectedPlayers.value.length > 0) {
    router.push({ path: '/ongoingGame' }).catch(() => {})
  }
}

const usedColors = ref(new Set())

function getRandomColor() {
  const colors = [
    'red',
    'pink',
    'purple',
    'deep-purple',
    'indigo',
    'blue',
    'light-blue',
    'cyan',
    'teal',
    'green',
    'amber',
    'orange',
    'deep-orange',
    'blue-grey',
  ]
  const availableColors = colors.filter((c) => !usedColors.value.has(c))
  if (availableColors.length === 0) {
    // If all colors are used, reset
    usedColors.value.clear()
    return getRandomColor()
  }
  const color = availableColors[Math.floor(Math.random() * availableColors.length)]
  usedColors.value.add(color)
  return color
}
</script>
