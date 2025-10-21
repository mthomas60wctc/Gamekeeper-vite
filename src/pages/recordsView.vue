<template>
  <div class="q-pa-md">
    <div class="text-h6">Individual Records</div>
    <q-select
      square
      v-model="selectedGame"
      :options="gameOptions"
      label="Select game(s)"
      class="q-mb-md"
      multiple
      clearable
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
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import "../css/tableStyles.scss";
import { addAndGetPlayer, addPlays, addWins } from "../js/helpers";
const route = useRoute();
const router = useRouter();

// queryGame and queryPlayers will be read onMounted; initialize empty
const selectedGame = ref([]);

const dynamicColumns = computed(() => {
  const columns = [
    {
      name: "name",
      required: true,
      label: "Name",
      align: "left",
      field: "name",
      sortable: true,
    },
  ];

  selectedGame.value.forEach((game) => {
    columns.push({
      name: game,
      label: game,
      align: "center",
      field: (row) => row.wins[game] || 0,
      sortable: true,
      sort: (a, b) => b - a, // Sort descending (highest wins first)
    });
  });

  columns.push({
    name: "total",
    label: "Total Wins",
    align: "center",
    field: (row) => getTotalWins(row),
    sortable: true,
    sort: (a, b) => b - a, // Sort descending (highest total first)
  });

  columns.push({
    name: "total",
    label: "Total Plays",
    align: "center",
    field: (row) => getTotalPlays(row),
    sortable: true,
    sort: (a, b) => b - a, // Sort descending (highest total first)
  });

  return columns;
});

const records = [
  {
    name: "Alice",
    wins: {},
    plays: {},
  },
  {
    name: "Bob",
    wins: {},
    plays: {},
  },
  {
    name: "Charlie",
    wins: {},
    plays: {},
  },
  {
    name: "Diana",
    wins: {},
    plays: {},
  },
  {
    name: "Eve",
    wins: {},
    plays: {},
  },
  {
    name: "Frank",
    wins: {},
    plays: {},
  },
  {
    name: "Grace",
    wins: {},
    plays: {},
  },
  {
    name: "Hannah",
    wins: {},
    plays: {},
  },
  {
    name: "Ivan",
    wins: {},
    plays: {},
  },
  {
    name: "Judy",
    wins: {},
    plays: {},
  },
];

// (Filtering of records by query players is handled during onMounted so route
// query values can be normalized first.)

let gameOptions = [];

function getTotalWins(record) {
  if (selectedGame.value.length === 0) {
    return Object.values(record.wins).reduce((total, wins) => total + wins, 0);
  }
  return selectedGame.value.reduce((total, game) => {
    return total + (record.wins[game] || 0);
  }, 0);
}

function getTotalPlays(record) {
  if (selectedGame.value.length === 0) {
    return Object.values(record.plays).reduce(
      (total, plays) => total + plays,
      0
    );
  }
  return selectedGame.value.reduce((total, game) => {
    return total + (record.plays[game] || 0);
  }, 0);
}

onMounted(() => {
  const qGame = route.query.game;
  const qPlayers = JSON.parse(decodeURIComponent(route.query.players || "[]"));
  const qWinner = route.query.winner;
  console.log("Query parameters:", { qGame, qPlayers, qWinner });

  // set selectedGame - turn single string into array for the multi-select
  selectedGame.value = qGame ? [String(qGame)] : [];

  if (qPlayers) {
    const playersArray = Array.isArray(qPlayers) ? qPlayers : [qPlayers];
    playersArray.forEach((p) => {
      if (p) addPlays(records, String(p), qGame);
    });
  }

  // qWinner may be undefined or a string
  if (qWinner && qGame) {
    addWins(records, String(qWinner), String(qGame));
  }

  gameOptions = Array.from(
    new Set(records.flatMap((r) => Object.keys(r.plays)))
  );

  // clear the query so reload doesn't re-apply
  router.replace({ path: route.path, query: {} }).catch(() => {});
});
</script>
