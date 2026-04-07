<template>
  <div class="sticky top-0 z-30 -mx-5 bg-cream/90 px-5 pb-3 pt-2 backdrop-blur-xl">
    <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      <button
        v-for="category in categories"
        :key="category.key"
        class="whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition duration-200"
        :class="category.key === activeCategory
          ? 'border-transparent bg-accent text-white shadow-[0_10px_25px_-15px_rgba(255,92,66,0.9)]'
          : 'border-white/70 bg-white/70 text-ink/70 hover:bg-white'"
        @click="setCategory(category.key)"
      >
        {{ category.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: { type: Array, default: () => [] },
  activeCategory: { type: String, default: "all" }
});

const emit = defineEmits(["change"]);
const setCategory = (key) => emit("change", key);
</script>
