<template>
  <section class="h-screen flex flex-col px-5 py-4 overflow-hidden">

    <div class="mx-auto flex flex-1 flex-col max-w-md min-h-0">

      <!-- HEADER -->
      <div class="shrink-0 text-center">
        <h2 class="text-xl sm:text-2xl font-semibold text-ink">
          <span class="italic">Welcome to</span> <span class="font-bold text-accent">EzMenu'</span>
        </h2>

        <p class="text-xs sm:text-sm text-ink/60">
          Explore today’s menu, add to cart, and checkout easily.
        </p>
      </div>

      <!-- GRID -->
      <div class="flex-[0.6] min-h-0 mt-3">
        <div class="glass-strong h-full rounded-[22px] p-3 sm:p-5">

          <div class="grid grid-cols-2 gap-3 h-full auto-rows-fr">

            <div
              v-for="card in gridCards"
              :key="card.id"
              class="relative w-full h-full aspect-square overflow-hidden rounded-xl"
              :class="card.glass
                ? 'border border-white/70 bg-white/60 p-3 sm:p-4 backdrop-blur-xl'
                : ''"
            >

              <!-- IMAGE -->
              <template v-if="card.image">
                <img
                  :src="card.image"
                  class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"></div>
              </template>

              <!-- EMPTY -->
              <template v-else>
                <div class="absolute inset-0 bg-gradient-to-t from-ink/5 via-transparent to-transparent"></div>
              </template>

              <!-- TEXT -->
              <div class="absolute bottom-2 left-2 right-2 text-white">
                <p class="text-xs sm:text-sm font-semibold">
                  {{ card.title }}
                </p>
                <p class="text-[10px] sm:text-xs text-white/80">
                  {{ card.subtitle }}
                </p>
              </div>

              <!-- GLASS -->
              <div
                v-if="card.glass"
                class="relative h-full flex flex-col justify-between text-ink"
              >
                <p class="text-[10px] uppercase tracking-widest opacity-40">
                  {{ card.brand }}
                </p>

                <h1 class="text-sm sm:text-base font-semibold">
                  {{ card.headline }}
                </h1>

                <p class="text-[10px] sm:text-xs opacity-70">
                  {{ card.description }}
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

      <!-- HERO (FIXED RESPONSIVE HEIGHT) -->
      <div class="flex-[0.6] min-h-0 mt-3">
        <transition name="hero" mode="out-in">
          <div
            :key="activeSlide.id"
            class="relative w-full h-full max-h-[160px] rounded-2xl overflow-hidden"
          >
            <img
              :src="activeSlide.image"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <div class="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent"></div>

            <div class="absolute left-3 top-3 text-white">
              <p class="text-[10px] sm:text-xs opacity-70">Featured</p>

              <h3 class="text-sm sm:text-lg font-semibold">
                {{ activeSlide.title }}
              </h3>

              <p class="text-xs opacity-80">
                {{ activeSlide.subtitle }}
              </p>
            </div>
          </div>
        </transition>
      </div>

      <!-- BUTTON -->
      <div class="shrink-0 mt-2">
        <router-link
          to="/menu"
          class="w-full block rounded-xl bg-accent hover:bg-accent/80 py-3 text-center text-sm font-semibold text-white"
        >
          Get Start Now
        </router-link>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const gridCards = [
  {
    id: "food",
    title: "Food",
    subtitle: "Savory Khmer favorites",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    lightText: true,
  },
  {
    id: "drinks",
    title: "Drinks",
    subtitle: "Cold brew and teas",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    lightText: true,
  },
  {
    id: "dessert",
    title: "Dessert",
    subtitle: "Sweet coconut treats",
    image:
      "https://d122axpxm39woi.cloudfront.net/images/guides/origin/639a8bbe29d86.jpg?auto=format&fit=crop&w=900&q=80",
    lightText: true,
  },
  {
    subtitle: "",
    brand:"EzMenu",
    headline: "Fresh bites, fast checkout.",
    description: "Pick favorites and order in minutes.",
    glass: true,
    lightText: false,
  },
];

const slides = [
  {
    id: "lok-lak",
    title: "Lok Lak Bowl",
    subtitle: "Pepper-lime beef with crisp greens",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "amok",
    title: "Amok Curry",
    subtitle: "Coconut fish curry with herbs",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "lemongrass",
    title: "Lemongrass Noodles",
    subtitle: "Silky noodles with herb oil",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80",
  },
];

const activeIndex = ref(0);
const activeSlide = computed(() => slides[activeIndex.value]);

let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % slides.length;
  }, 3000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.hero-enter-active,
.hero-leave-active {
  transition: opacity 400ms ease;
}

.hero-enter-from,
.hero-leave-to {
  opacity: 0;
}

.hero-enter-to,
.hero-leave-from {
  opacity: 1;
}
</style>