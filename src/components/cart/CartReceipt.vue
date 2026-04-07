<template>
  <div class="mt-4 space-y-3">
    <div class="rounded-2xl border border-pebble/60 bg-cream/70 p-4">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-ink/50">Receipt</p>
          <p class="mt-1 text-sm font-semibold text-ink">Order #{{ receiptId }}</p>
        </div>
        <div class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          Paid
        </div>
      </div>

      <div class="mt-4 rounded-2xl border border-white/70 bg-white/80 p-3">
        <div class="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/50">
          <span>Items</span>
          <span>Amount</span>
        </div>
        <div class="mt-3 space-y-2">
          <div
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between text-sm text-ink/70"
          >
            <span>{{ item.name }} x{{ item.quantity }}</span>
            <span class="font-semibold text-ink">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        <div class="mt-3 grid gap-2 border-t border-white/70 pt-3 text-xs text-ink/60">
          <div class="flex items-center justify-between">
            <span>Transaction ID</span>
            <span class="font-semibold text-ink">{{ transactionId }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Reference</span>
            <span class="font-semibold text-ink">{{ referenceId }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span>Date</span>
            <span class="font-semibold text-ink">{{ receiptDate }}</span>
          </div>
        </div>
      </div>

      <div class="mt-3 text-sm text-ink/70">
        Paid via <span class="font-semibold text-ink">{{ selectedBankName }}</span>
      </div>

      <div class="mt-3 rounded-2xl border border-white/70 bg-white/70 p-3 text-sm text-ink/70">
        <div class="flex items-center justify-between">
          <span>Subtotal</span>
          <span class="font-semibold text-ink">$ {{ totalUsd.toFixed(2) }}</span>
        </div>
        <div class="mt-1 flex items-center justify-between text-xs text-ink/50">
          <span>KHR</span>
          <span>{{ totalKhrFormatted }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  receiptId: { type: String, default: "" },
  transactionId: { type: String, default: "" },
  referenceId: { type: String, default: "" },
  receiptDate: { type: String, default: "" },
  selectedBankName: { type: String, default: "" },
  totalUsd: { type: Number, default: 0 },
  totalKhrFormatted: { type: String, default: "0" }
});
</script>
