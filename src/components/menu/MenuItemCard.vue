<template>
  <article
    class="glass-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-2 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_55px_-30px_rgba(17,38,55,0.7)]"
  >
    <div class="relative overflow-hidden rounded-2xl bg-sand/70">
      <div class="pt-[75%]"></div>
      <img
        :src="item.image"
        :alt="item.name"
        class="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
      />
      <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink/40 to-transparent"></div>
    </div>

    <div class="mt-3 flex flex-1 flex-col gap-2 px-1 pb-1">
      <div>
        <h3 class="text-base font-semibold text-ink">{{ item.name }}</h3>
        <p class="text-[11px] text-ink/60 line-clamp-2">{{ item.description }}</p>
      </div>
      <div class="mt-auto flex items-center justify-between">
        <div class="text-xs text-ink/70">
          <div class="text-sm font-semibold text-ink">$ {{ item.price.toFixed(2) }}</div>
          <div class="text-[11px] text-ink/50">KHR {{ formatKHR(item.priceKHR) }}</div>
        </div>
        <button
          @click="add"
          class="grid h-10 w-10 place-items-center rounded-full bg-accent text-white shadow-[0_10px_20px_-12px_rgba(255,92,66,0.9)] transition duration-200 active:scale-95"
          aria-label="Add to cart"
        >
          +
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>

const props = defineProps({
  item: { type: Object, required: true }
});

const emit = defineEmits(["add"]);
const add = () => emit("add", props.item);
const formatKHR = (value) => new Intl.NumberFormat("en-US").format(Math.round(value));
</script>
