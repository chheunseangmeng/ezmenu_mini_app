<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <button
        v-if="step !== 'cart'"
        class="inline-flex items-center gap-2 rounded-full border border-pebble/70 bg-white/80 px-4 py-1 text-xs font-semibold text-ink/70"
        @click="$emit('back')"
      >
        <i class="fa-solid fa-chevron-left text-[10px]"></i>
        Back
      </button>
      <div v-else>
        <p class="text-sm font-semibold text-ink">Your Cart</p>
        <p class="text-xs text-ink/50">{{ count }} items</p>
      </div>
    </div>
    <button
      class="rounded-full border border-pebble/60 px-3 py-1 text-xs text-ink/60"
      @click="$emit('close')"
    >
      Close
    </button>
  </div>
</template>

<script setup>
defineProps({
  step: { type: String, default: "cart" },
  count: { type: Number, default: 0 }
});
defineEmits(["back", "close"]);
</script>
