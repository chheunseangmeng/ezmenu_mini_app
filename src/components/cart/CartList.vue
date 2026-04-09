<template>
  <div class="mt-4 max-h-[50vh] overflow-y-auto pr-1">
    <transition-group name="cart-item" tag="div" class="space-y-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex items-center gap-3 rounded-2xl border border-pebble/60 bg-cream/70 p-3"
      >
        <img :src="item.image" :alt="item.name" class="h-14 w-14 rounded-xl object-cover" />
        <div class="flex-1">
          <p class="text-sm font-semibold text-ink">{{ item.name }}</p>
          <p class="text-[11px] text-ink/50">$ {{ item.price.toFixed(2) }} · KHR {{ props.formatKHR(item.priceKHR) }}</p>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="h-8 w-8 rounded-full border border-pebble/70 text-sm text-ink"
            @click="$emit('decrement', item.id)"
          >
            -
          </button>
          <span class="w-5 text-center text-sm font-semibold">{{ item.quantity }}</span>
          <button
            class="h-8 w-8 rounded-full bg-accent text-sm text-white shadow-[0_10px_20px_-15px_rgba(255,92,66,0.9)]"
            @click="$emit('increment', item.id)"
          >
            +
          </button>
          <button
            class="ml-1 grid h-8 w-8 place-items-center rounded-full border border-pebble/70 text-xs text-ink/60"
            @click="$emit('remove', { id: item.id, name: item.name })"
            aria-label="Remove item"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </transition-group>
    <div v-if="items.length === 0" class="rounded-2xl border border-dashed border-pebble/70 bg-cream/60 p-6 text-center text-sm text-ink/60">
      Your cart is empty.
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  formatKHR: { type: Function, default: (value) => value }
});
defineEmits(["increment", "decrement", "remove"]);
</script>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.cart-item-enter-to,
.cart-item-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
