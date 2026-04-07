<template>
  <div class="mt-4 space-y-3">
    <div class="rounded-2xl border border-pebble/60 bg-cream/70 p-4 text-sm text-ink/70">
      Choose a bank to continue payment.
    </div>
    <div class="space-y-2">
      <label
        v-for="bank in banks"
        :key="bank.id"
        class="flex cursor-pointer items-center justify-between rounded-2xl border border-pebble/60 bg-white/70 px-4 py-3 text-sm transition hover:bg-white"
      >
        <div>
          <p class="font-semibold text-ink">{{ bank.name }}</p>
          <p class="text-[11px] text-ink/50">{{ bank.detail }}</p>
        </div>
        <input
          type="radio"
          name="bank"
          class="h-4 w-4 accent-accent"
          :value="bank.id"
          :checked="bank.id === selectedBank"
          @change="$emit('select', bank.id)"
        />
      </label>
    </div>
    <div class="rounded-2xl border border-pebble/60 bg-cream/70 p-4 text-xs text-ink/60">
      Transfer to: <span class="font-semibold text-ink">{{ paymentAccount }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  banks: { type: Array, default: () => [] },
  selectedBank: { type: String, default: "" },
  paymentAccount: { type: String, default: "" }
});
defineEmits(["select"]);
</script>
