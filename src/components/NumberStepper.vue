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
import { ref, computed, watch } from "vue";
const emit = defineEmits(["update:value", "update:modelValue"]);

const props = defineProps({
  modelValue: { type: Number, default: undefined },
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
});

let state = ref(Number(props.modelValue) || 0);

// sync with parent
watch(
  () => props.modelValue,
  (v) => {
    if (v === undefined) return;
    const num = Number(v) || 0;
    if (num !== state.value) state.value = num;
  }
);

const isAtMin = computed(() => state.value <= props.min);
const isAtMax = computed(() => state.value >= props.max);

function increment() {
  const next = Math.min(state.value + props.step, props.max);
  state.value = next;
  emit("update:value", state.value);
  emit("update:modelValue", state.value);
}

function decrement() {
  const next = Math.max(state.value - props.step, props.min);
  state.value = next;
  emit("update:value", state.value);
  emit("update:modelValue", state.value);
}

</script>
