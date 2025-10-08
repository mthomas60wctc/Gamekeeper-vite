<template>
  <div class="row items-center">
    <q-btn
      dense
      flat
      round
      icon="sym_s_remove"
      @click="decrement()"
      :disable="isAtMin"
      aria-label="decrement"
    />
    <span class="q-mx-sm" style="min-width: 40px; text-align: center">
      {{ state }}
    </span>
    <q-btn
      dense
      flat
      round
      icon="sym_s_add"
      @click="increment()"
      :disable="isAtMax"
      aria-label="increment"
    />
  </div>
</template>

<script setup>
defineOptions({ name: "NumberStepper" });
import { ref, computed } from "vue";

const props = defineProps({
  value: { type: Number, default: 0 },
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
});

let state = ref(Number(props.value) || 0);

const isAtMin = computed(() => state.value <= props.min);
const isAtMax = computed(() => state.value >= props.max);

function increment() {
  const next = Math.min(state.value + props.step, props.max);
  state.value = next;
}

function decrement() {
  const next = Math.max(state.value - props.step, props.min);
  state.value = next;
}

</script>
