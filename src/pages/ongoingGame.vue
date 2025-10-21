<template>
  <q-tabs v-model="tab" dense>
    <q-tab name="current" label="Current Round" />
    <q-tab name="history" label="History" />
  </q-tabs>
  <q-separator />
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="current">
      <q-table
        :rows="rows"
        :columns="abbvCols"
        row-key="name"
        flat
        bordered
        :pagination="{ rowsPerPage: 0 }"
        hide-pagination
      >
        <template v-slot:body-cell-CurrentRound="props">
          <q-td :props="props">
            <div class="row items-center justify-center no-wrap">
              <NumberStepper
                :min="0"
                v-model:modelValue="props.row.currentRound"
              />
            </div>
          </q-td>
        </template>
      </q-table>
    </q-tab-panel>
    <q-tab-panel name="history">
      <q-table
        class="my-sticky-table"
        :rows="rows"
        :columns="cols"
        row-key="name"
        flat
        bordered
        :pagination="{ rowsPerPage: 0 }"
        hide-pagination
      >
      </q-table>
    </q-tab-panel>
  </q-tab-panels>

  <BottomBar
    @cancel="endGame()"
    cancel-label="Exit Game"
    :cancel-icon="'sym_s_exit_to_app'"
    confirm-label="Next Round"
    :confirm-icon="'sym_s_arrow_forward'"
    @confirm="finishRound()"
  />
</template>

<script setup>
import "../css/tableStyles.scss";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BottomBar from "../components/BottomBar.vue";
import NumberStepper from "../components/NumberStepper.vue";

const route = useRoute();
const router = useRouter();
const game = route.query.game;
const players = JSON.parse(decodeURIComponent(route.query.players || "[]"));

const abbvCols = [
  {
    name: "Name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: "CurrentRound",
    align: "center",
    label: "Points This Round",
    field: (row) => row.currentRound,
    sortable: false,
  },
  {
    name: "Total",
    align: "center",
    label: "Total",
    field: (row) => row.total,
    sortable: false,
  },
];

const rows = ref(
  players.map((player) => ({
    name: player,
    scores: [],
    currentRound: 0,
    total: 0,
  }))
);

const tab = ref("current");

function finishRound() {
  rows.value.forEach((row) => {
    const score = Number(row.currentRound);
    if (!Array.isArray(row.scores)) row.scores = [];
    row.scores.push(score);
    // recompute total from scores to keep it consistent
    row.total = row.scores.reduce((acc, v) => acc + (Number(v) || 0), 0);
    row.currentRound = 0;
  });
}

function endGame() {
  // find player with the highest total
  let topScore = rows.value[0].total;
  let winner = rows.value[0].name;
  rows.value.forEach((r) => {
    if (r.total > topScore) {
      topScore = r.total;
      winner = r.name;
    }
  });

  const payload = {
    game: game,
    winner: winner,
  };
  router.push({
      path: "/recordsView",
      query: {
        game: String(payload.game),
        winner: String(payload.winner),
        players: encodeURIComponent(JSON.stringify(players)),
      },
    }
  ).catch(() => {});
}

const cols = computed(() => {
  const colsArr = [
    {
      name: "Name",
      required: true,
      label: "Name",
      align: "left",
      field: (row) => row.name,
      sortable: true,
    },
  ];

  const maxRounds = Math.max(
    0,
    ...rows.value.map((r) => (r.scores || []).length)
  );

  for (let i = 0; i < maxRounds; i++) {
    colsArr.push({
      name: `Round${i + 1}`,
      align: "center",
      label: `Round ${i + 1}`,
      //make sure scores array exists and has a value at index i
      field: (row) => (row.scores && row.scores[i] != null ? row.scores[i] : 0),
      sortable: true,
    });
  }

  colsArr.push({
    name: "Total",
    align: "center",
    label: "Total",
    field: (row) => (row.total != null ? row.total : 0),
    sortable: true,
  });

  console.log("Computed cols:");

  return colsArr;
});
</script>
