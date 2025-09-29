<template>
  <div class="q-pa-md">
    <div class="text-h6">Individual Records</div>
    <q-select
      v-model="selectedGame"
      :options="gameOptions"
      label="Select game(s)"
      class="q-mb-md"
      multiple
      clearable
      color="red"
      @clear="selectedGame = []"
    />
  </div>
  <q-separator />
  <q-table
    :rows="records"
    :columns="dynamicColumns"
    row-key="name"
    flat
    bordered
    :pagination="{ rowsPerPage: 0 }"
    hide-pagination
  >
  </q-table>
</template>

<script setup>
//todo: add individual record page
//todo: add game record page
//todo: select between game and individual records
//todo: add linking from this page to  individual summary
import { ref, computed } from 'vue'
import '../css/tableStyles.scss'

const selectedGame = ref([])

const dynamicColumns = computed(() => {
  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: 'name',
      sortable: true,
    },
  ]

  selectedGame.value.forEach((game) => {
    columns.push({
      name: game,
      label: game,
      align: 'center',
      field: (row) => row.wins[game] || 0,
      sortable: true,
      sort: (a, b) => b - a, // Sort descending (highest wins first)
    })
  })

  columns.push({
    name: 'total',
    label: 'Total Wins',
    align: 'center',
    field: (row) => getTotalWins(row),
    sortable: true,
    sort: (a, b) => b - a, // Sort descending (highest total first)
  })

  return columns
})

//todo: load data from app state
const records = [
  {
    name: 'Alice',
    wins: {
      Chess: 5,
      Monopoly: 2,
      Poker: 3,
      Scrabble: 4,
      Uno: 6,
      'Settlers of Catan': 2,
      Risk: 1,
      Clue: 3,
      Codenames: 2,
      Carcassonne: 1,
      'Ticket to Ride': 2,
      'Go Fish': 4,
      Spades: 3,
      Hearts: 2,
      Bridge: 1,
      Dominoes: 2,
      Checkers: 3,
      Pandemic: 1,
      'Exploding Kittens': 2,
      Sequence: 1,
    },
  },
  {
    name: 'Bob',
    wins: {
      Chess: 2,
      Monopoly: 5,
      Poker: 4,
      Scrabble: 3,
      Uno: 1,
      'Settlers of Catan': 3,
      Risk: 2,
      Clue: 1,
      Codenames: 3,
      Carcassonne: 2,
      'Ticket to Ride': 1,
      'Go Fish': 2,
      Spades: 4,
      Hearts: 3,
      Bridge: 2,
      Dominoes: 1,
      Checkers: 2,
      Pandemic: 3,
      'Exploding Kittens': 1,
      Sequence: 2,
    },
  },
  {
    name: 'Charlie',
    wins: {
      Chess: 3,
      Monopoly: 4,
      Poker: 2,
      Scrabble: 5,
      Uno: 2,
      'Settlers of Catan': 1,
      Risk: 3,
      Clue: 2,
      Codenames: 1,
      Carcassonne: 3,
      'Ticket to Ride': 2,
      'Go Fish': 1,
      Spades: 2,
      Hearts: 4,
      Bridge: 3,
      Dominoes: 2,
      Checkers: 1,
      Pandemic: 2,
      'Exploding Kittens': 3,
      Sequence: 2,
    },
  },
  {
    name: 'Diana',
    wins: {
      Chess: 4,
      Monopoly: 3,
      Poker: 5,
      Scrabble: 2,
      Uno: 4,
      'Settlers of Catan': 2,
      Risk: 4,
      Clue: 3,
      Codenames: 5,
      Carcassonne: 2,
      'Ticket to Ride': 3,
      'Go Fish': 2,
      Spades: 1,
      Hearts: 2,
      Bridge: 4,
      Dominoes: 3,
      Checkers: 2,
      Pandemic: 1,
      'Exploding Kittens': 2,
      Sequence: 3,
    },
  },
  {
    name: 'Eve',
    wins: {
      Chess: 1,
      Monopoly: 3,
      Poker: 2,
      Scrabble: 4,
      Uno: 5,
      'Settlers of Catan': 3,
      Risk: 2,
      Clue: 1,
      Codenames: 2,
      Carcassonne: 4,
      'Ticket to Ride': 1,
      'Go Fish': 3,
      Spades: 2,
      Hearts: 1,
      Bridge: 2,
      Dominoes: 1,
      Checkers: 3,
      Pandemic: 2,
      'Exploding Kittens': 1,
      Sequence: 2,
    },
  },
  {
    name: 'Frank',
    wins: {
      Chess: 2,
      Monopoly: 1,
      Poker: 3,
      Scrabble: 2,
      Uno: 3,
      'Settlers of Catan': 1,
      Risk: 2,
      Clue: 3,
      Codenames: 4,
      Carcassonne: 2,
      'Ticket to Ride': 3,
      'Go Fish': 2,
      Spades: 1,
      Hearts: 2,
      Bridge: 3,
      Dominoes: 2,
      Checkers: 1,
      Pandemic: 3,
      'Exploding Kittens': 2,
      Sequence: 1,
    },
  },
  {
    name: 'Grace',
    wins: {
      Chess: 3,
      Monopoly: 2,
      Poker: 4,
      Scrabble: 1,
      Uno: 2,
      'Settlers of Catan': 2,
      Risk: 3,
      Clue: 2,
      Codenames: 3,
      Carcassonne: 1,
      'Ticket to Ride': 2,
      'Go Fish': 4,
      Spades: 3,
      Hearts: 2,
      Bridge: 1,
      Dominoes: 2,
      Checkers: 3,
      Pandemic: 1,
      'Exploding Kittens': 2,
      Sequence: 1,
    },
  },
  {
    name: 'Hannah',
    wins: {
      Chess: 4,
      Monopoly: 5,
      Poker: 2,
      Scrabble: 3,
      Uno: 1,
      'Settlers of Catan': 3,
      Risk: 2,
      Clue: 1,
      Codenames: 2,
      Carcassonne: 3,
      'Ticket to Ride': 1,
      'Go Fish': 2,
      Spades: 4,
      Hearts: 3,
      Bridge: 2,
      Dominoes: 1,
      Checkers: 2,
      Pandemic: 3,
      'Exploding Kittens': 1,
      Sequence: 2,
    },
  },
  {
    name: 'Ivan',
    wins: {
      Chess: 2,
      Monopoly: 3,
      Poker: 5,
      Scrabble: 4,
      Uno: 2,
      'Settlers of Catan': 1,
      Risk: 3,
      Clue: 2,
      Codenames: 1,
      Carcassonne: 2,
      'Ticket to Ride': 3,
      'Go Fish': 1,
      Spades: 2,
      Hearts: 4,
      Bridge: 3,
      Dominoes: 2,
      Checkers: 1,
      Pandemic: 2,
      'Exploding Kittens': 3,
      Sequence: 2,
    },
  },
  {
    name: 'Judy',
    wins: {
      Chess: 5,
      Monopoly: 4,
      Poker: 1,
      Scrabble: 2,
      Uno: 3,
      'Settlers of Catan': 2,
      Risk: 4,
      Clue: 3,
      Codenames: 5,
      Carcassonne: 2,
      'Ticket to Ride': 3,
      'Go Fish': 2,
      Spades: 1,
      Hearts: 2,
      Bridge: 4,
      Dominoes: 3,
      Checkers: 2,
      Pandemic: 1,
      'Exploding Kittens': 2,
      Sequence: 3,
    },
  },
]

const gameOptions = Array.from(new Set(records.flatMap((r) => Object.keys(r.wins))))

function getTotalWins(record) {
  if (selectedGame.value.length === 0) {
    return Object.values(record.wins).reduce((total, wins) => total + wins, 0)
  }
  return selectedGame.value.reduce((total, game) => {
    return total + (record.wins[game] || 0)
  }, 0)
}
</script>
