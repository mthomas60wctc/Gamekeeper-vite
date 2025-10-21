<template>
  <q-separator />
  <div>
    <div class="row justify-between">
      <q-btn
        :label="cancelLabel"
        :icon="cancelIcon"
        :color="cancelColor"
        flat
        @click="onCancel"
        :disable="!!cancelDisable"
      />
      <q-btn
        :label="confirmLabel"
        :icon="confirmIcon"
        :color="confirmColor"
        flat
        @click="onConfirm"
        :disable="!!confirmDisable"
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "BottomBar" });
const props = defineProps({
  cancelLabel: { type: String, default: "Cancel" },
  cancelIcon: { type: String, default: "sym_s_cancel" },
  cancelColor: { type: String, default: "primary" },
  cancelDisable: { type: Boolean, default: false },
  confirmLabel: { type: String, default: "Confirm" },
  confirmIcon: { type: String, default: "sym_s_check" },
  confirmColor: { type: String, default: "secondary" },
  confirmDisable: { type: Boolean, default: false },
});

const emit = defineEmits(["cancel", "confirm"]);

function onCancel() {
  emit("cancel");
}

function onConfirm() {
  emit("confirm");
}
</script>
