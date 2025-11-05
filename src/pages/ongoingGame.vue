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
        <template v-slot:header-cell="props">
          <q-th :props="props">
            <div class="row items-center justify-center no-wrap">
              {{ props.col.label }}
              <q-icon
                v-if="props.col.name !== 'Name' && props.col.name !== 'Total'"
                name="sym_s_edit"
                @click="editRound(props.row, props.col)"
                mouse="pointer"
              />
            </div>
          </q-th>
        </template>
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
  <q-dialog v-model="editDialog.show" persistent>
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="row items-center no-wrap" style="width: 100%">
          <div class="text-h6">Edit {{ editDialog.col.label }}</div>
          <q-btn
            v-if="editDialog.roundIndex !== null"
            flat
            dense
            round
            color="negative"
            icon="sym_s_delete"
            @click="deleteRound(editDialog.roundIndex)"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div v-for="row in rows" :key="row.name" class="q-mb-md">
          {{ row.name }} score
          <q-input v-model.number="editDialog.values[row.name]" type="number" />
        </div>
      </q-card-section>
      <BottomBar
        @cancel="editDialog.show = false"
        cancel-label="Cancel"
        :cancel-icon="'sym_s_close'"
        confirm-label="Save"
        :confirm-icon="'sym_s_check'"
        @confirm="saveEdit()"
      />
    </q-card>
  </q-dialog>
</template>

<script setup>
import "../css/tableStyles.scss";
import { ref, computed } from "vue";
import { createPlayerRecord } from "../js/dataStructures";
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

const rows = ref(players.map((player) => createPlayerRecord(player)));

const tab = ref("current");

const editDialog = ref({
  show: false,
  row: null,
  col: null,
  roundIndex: null,
  values: {},
});

function editRound(row, col) {
  const match = String(col.name).match(/^Round(\d+)$/);
  const roundIndex = match ? Number(match[1]) - 1 : null;

  const values = {};
  rows.value.forEach((r) => {
    values[r.name] =
      r.scores && roundIndex !== null && r.scores[roundIndex] != null
        ? r.scores[roundIndex]
        : null;
  });

  editDialog.value = { show: true, row, col, roundIndex, values };
}

function saveEdit() {
  const idx = editDialog.value.roundIndex;
  if (idx == null) {
    editDialog.value.show = false;
    return;
  }

  rows.value.forEach((r) => {
    if (!Array.isArray(r.scores)) r.scores = [];
    const v = editDialog.value.values[r.name];
    // if user provided a value (including 0), write it; if null leave unchanged
    if (v != null) {
      r.scores[idx] = Number(v) || 0;
    }
    // recompute total from scores to keep it consistent
    r.total = (r.scores || []).reduce(
      (acc, val) => acc + (Number(val) || 0),
      0
    );
  });

  editDialog.value.show = false;
}

function deleteRound(idx) {
  if (idx == null) return;
  rows.value.forEach((r) => {
    if (Array.isArray(r.scores)) {
      r.scores.splice(idx, 1);
      r.total = (r.scores || []).reduce((acc, v) => acc + (Number(v) || 0), 0);
    }
  });
  // close dialog after deletion
  editDialog.value.show = false;
}

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
  router
    .push({
      path: "/recordsView",
      query: {
        game: String(payload.game),
        winner: String(payload.winner),
        players: encodeURIComponent(JSON.stringify(players)),
      },
    })
    .catch(() => {});
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

  return colsArr;
});
</script>
