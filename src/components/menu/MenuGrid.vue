<template>
  <div class="mt-5 grid gap-4 grid-cols-2">
    <MenuItemCard
      v-for="item in items"
      :key="item.id"
      :item="item"
      :is-favorite="favoriteIds.includes(item.id)"
      @add="add"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script setup>
import MenuItemCard from "./MenuItemCard.vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  favoriteIds: { type: Array, default: () => [] }
});

const emit = defineEmits(["add", "toggle-favorite"]);
const add = (item) => emit("add", item);
const toggleFavorite = (itemId) => emit("toggle-favorite", itemId);
</script>
