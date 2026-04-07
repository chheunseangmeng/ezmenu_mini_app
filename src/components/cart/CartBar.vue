<template>
  <button
    v-if="count > 0"
    class="glass-card fixed left-1/2 z-40 w-[92%] -translate-x-1/2 rounded-3xl text-ink"
    style="bottom: calc(1rem + env(safe-area-inset-bottom));"
    @click="open"
  >
    <div class="flex items-center justify-between px-5 py-4">
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-ink/50">Cart</p>
        <p class="text-base font-semibold">
          <i class="fa-solid fa-cart-arrow-down"></i> {{ count }} items
        </p>
      </div>
      <div class="text-right">
        <p class="text-sm font-semibold">$ {{ totalUSD.toFixed(2) }}</p>
        <p class="text-xs text-ink/50">KHR {{ formatKHR(totalKHR) }}</p>
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../../stores/cartStore";

const emit = defineEmits(["open"]);
const cart = useCartStore();
const count = computed(() => cart.count);
const totalUSD = computed(() => cart.total);
const totalKHR = computed(() => cart.totalKHR);
const formatKHR = (value) => new Intl.NumberFormat("en-US").format(Math.round(value));

const open = () => emit("open");
</script>
