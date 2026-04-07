<template>
  <div class="mt-5 grid gap-4 grid-cols-2">
    <MenuItemCard v-for="item in items" :key="item.id" :item="item" @add="add" />
  </div>
</template>

<script setup>
import MenuItemCard from "./MenuItemCard.vue";

const props = defineProps({
  items: { type: Array, default: () => [] }
});

const emit = defineEmits(["add"]);
const add = (item) => emit("add", item);
</script>
