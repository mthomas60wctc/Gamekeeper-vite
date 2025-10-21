<template>
  <div class="q-pa-lg q-gutter-lg">
    <div class="row q-gutter-md items-end">
      <q-select
        standout
        v-model="gameSelected"
        use-input
        input-debounce="0"
        label="Game"
        :options="games"
        @filter="filterFn"
        style="width: 300px"
        behavior="menu"
        clearable
        class="col-grow"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No matching game - Create a new game!</q-item-section
            >
          </q-item>
        </template>
      </q-select>

      <q-btn
        icon="sym_s_add"
        label="New Game"
        class="q-mb-sm"
        color="secondary"
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
        <q-chip
          clickable
          square
          @click="newPlayerDialog = true"
          color="grey-4"
          text-color="dark"
          icon="sym_s_person_add"
        >
          New Player
        </q-chip>
      </div>
    </div>
  </div>
  <BottomBar
    @cancel="resetForm"
    @confirm="startGame"
    cancel-label="Reset Form"
    :cancel-icon="'sym_s_refresh'"
    confirm-label="Start Game"
    :confirm-icon="'sym_s_play_arrow'"
    :confirm-disable="!validConfiguration()"
  />
  <q-dialog v-model="newPlayerDialog" backdrop-filter="blur(4px)">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New Player</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          standout
          color="red"
          label="Player Name"
          v-model="newPlayerName"
          autofocus
          @keyup.enter="createPlayer()"
        />
      </q-card-section>
      <BottomBar
        @cancel="newPlayerDialog = false"
        @confirm="createPlayer()"
        confirm-label="Add"
        :confirm-icon="'sym_s_add'"
      />
    </q-card>
  </q-dialog>
</template>

<script setup>
//todo: add new player button + functionality
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import BottomBar from '../components/BottomBar.vue'

const router = useRouter();
const gameSelected = ref(null);
const chipColors = ref([]);
const selectedPlayers = ref([]);
const newGameName = ref("");
const newPlayerDialog = ref(false);
const newPlayerName = ref("");

const availablePlayers = computed(() => {
  return playersFull.filter(
    (player) => !selectedPlayers.value.includes(player)
  );
});

const playersFull = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace",
  "Hannah",
  "Ivan",
  "Judy",
];

const gamesFull = [
  "Chess",
  "Monopoly",
  "Poker",
  "Scrabble",
  "Uno",
  "Settlers of Catan",
  "Risk",
  "Clue",
  "Codenames",
  "Carcassonne",
  "Ticket to Ride",
  "Go Fish",
  "Spades",
  "Hearts",
  "Bridge",
  "Dominoes",
  "Checkers",
  "Pandemic",
  "Exploding Kittens",
  "Sequence",
];

const games = ref([...gamesFull]);

function filterFn(val, update) {
  if (val === "") {
    update(() => {
      games.value = gamesFull;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    games.value = gamesFull.filter((v) => v.toLowerCase().indexOf(needle) > -1);
  });
}

//todo: add error text if player name is empty or already exists
//todo: available / selected player list sorting?
function createPlayer() {
  const name = newPlayerName.value.trim()
  if (name && !playersFull.includes(name)) {
    playersFull.push(name)
    addPlayer(name)
    newPlayerName.value = ''
    newPlayerDialog.value = false
  }
}

function addPlayer(player) {
  if (!selectedPlayers.value.includes(player)) {
    selectedPlayers.value.push(player);
    chipColors.value.push(getRandomColor());
  }
}

function removePlayer(player) {
  const index = selectedPlayers.value.indexOf(player);
  if (index > -1) {
    selectedPlayers.value.splice(index, 1);
    const color = chipColors.value[index];
    chipColors.value.splice(index, 1);
    usedColors.value.delete(color);
  }
}

function resetForm() {
  gameSelected.value = null;
  selectedPlayers.value = [];
  chipColors.value = [];
  usedColors.value.clear();
  newGameName.value = "";
}

function validConfiguration() {
  return gameSelected.value !== null && selectedPlayers.value.length > 1;
}

function startGame() {
  if (validConfiguration()) {
    // pass the selected game and players to the ongoingGame page via the query string
    // players are JSON-encoded to preserve the array structure
    const payload = {
      game: gameSelected.value,
      players: selectedPlayers.value,
    };
    router
      .push({
        path: "/ongoingGame",
        query: {
          game: String(payload.game),
          players: encodeURIComponent(JSON.stringify(payload.players)),
        },
      })
      .catch(() => {});
  }
}

const usedColors = ref(new Set());

function getRandomColor() {
  const colors = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "amber",
    "orange",
    "deep-orange",
    "blue-grey",
  ];
  const availableColors = colors.filter((c) => !usedColors.value.has(c));
  if (availableColors.length === 0) {
    // If all colors are used, reset
    usedColors.value.clear();
    return getRandomColor();
  }
  const color =
    availableColors[Math.floor(Math.random() * availableColors.length)];
  usedColors.value.add(color);
  return color;
}
</script>
