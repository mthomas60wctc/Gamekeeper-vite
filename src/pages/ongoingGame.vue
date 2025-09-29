<template>
  <q-tabs v-model="tab" class="text-red">
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
              <q-btn
                icon="sym_s_remove"
                dense
                flat
                round
                @click="props.row.currentRound = Math.max(0, props.row.currentRound - 1)"
                size="sm"
                aria-label="Decrease"
              />
              <span class="q-mx-sm" style="min-width: 40px; text-align: center">{{
                props.row.currentRound
              }}</span>
              <q-btn
                icon="sym_s_add"
                dense
                flat
                round
                @click="props.row.currentRound += 1"
                size="sm"
                aria-label="Increase"
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
  
  <q-separator />
  <div class="row justify-between">
    <q-btn label="Exit Game" icon="sym_s_exit_to_app" color="amber-14" flat />
    <q-btn label="Next Round" icon="sym_s_arrow_forward" color="red" flat />
  </div>
</template>

<script setup>
import '../css/tableStyles.scss'
import { ref } from 'vue'

const abbvCols = [
  {
    name: 'Name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: 'CurrentRound',
    align: 'center',
    label: 'Current Round',
    field: (row) => row.currentRound,
    sortable: false,
  },
  {
    name: 'Total',
    align: 'center',
    label: 'Total',
    field: (row) => row.total,
    sortable: false,
  },
]

//todo: make dynamic based on number of rounds

const cols = [
  {
    name: 'Name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'Round1',
    align: 'center',
    label: 'Round 1',
    field: (row) => row.scores[0],
    sortable: true,
  },
  {
    name: 'Round2',
    align: 'center',
    label: 'Round 2',
    field: (row) => row.scores[1],
    sortable: true,
  },
  {
    name: 'Round3',
    align: 'center',
    label: 'Round 3',
    field: (row) => row.scores[2],
    sortable: true,
  },
  {
    name: 'Round4',
    align: 'center',
    label: 'Round 4',
    field: (row) => row.scores[3],
    sortable: true,
  },
  {
    name: 'Round5',
    align: 'center',
    label: 'Round 5',
    field: (row) => row.scores[4],
    sortable: true,
  },
  {
    name: 'Round6',
    align: 'center',
    label: 'Round 6',
    field: (row) => row.scores[5],
    sortable: true,
  },
  {
    name: 'Round7',
    align: 'center',
    label: 'Round 7',
    field: (row) => row.scores[6],
    sortable: true,
  },
  {
    name: 'Total',
    align: 'center',
    label: 'Total',
    field: (row) => row.total,
    sortable: true,
  },
]

//todo:load data from app state

const rows = ref([
  {
    name: 'Anne',
    scores: [2, 4, 6, 8, 10, 0, 3],
    currentRound: 0,
    total: 33,
  },
  {
    name: 'Bob',
    scores: [3, 5, 7, 9, 2, 4, 6],
    currentRound: 0,
    total: 36,
  },
  {
    name: 'Charlie',
    scores: [10, 8, 6, 4, 2, 0, 1],
    currentRound: 0,
    total: 31,
  },
  {
    name: 'Diana',
    scores: [2, 3, 5, 7, 9, 10, 8],
    currentRound: 0,
    total: 44,
  },
])

const tab = ref('current')
</script>
