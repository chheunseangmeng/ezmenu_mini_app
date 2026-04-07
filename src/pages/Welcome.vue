<template>
  <section class="min-h-screen px-5 pb-10 pt-10">
    <div class="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col">
      <div class="flex-1">
        <div class="text-center">
          <h2 class="text-2xl font-semibold text-ink">Welcome to EZMENU</h2>
          <p class="mt-2 text-sm text-ink/60">
            Explore today’s menu, add to cart, and checkout easily.
          </p>
        </div>

        <div class="glass-strong mt-6 relative overflow-hidden rounded-[32px] p-6">
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="card in gridCards"
              :key="card.id"
              class="relative h-40 w-full overflow-hidden rounded-2xl"
              :class="card.glass ? 'border border-white/70 bg-white/60 p-4 shadow-[0_20px_35px_-25px_rgba(15,29,40,0.4)] backdrop-blur-xl' : ''"
            >
              <template v-if="card.image">
                <img :src="card.image" :alt="card.title" class="h-full w-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent"></div>
              </template>
              <template v-else>
                <div class="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-blush/50 blur-2xl"></div>
                <div class="absolute -bottom-8 -right-6 h-28 w-28 rounded-full bg-breeze/50 blur-2xl"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-ink/5 via-transparent to-transparent"></div>
              </template>

              <div v-if="!card.glass" class="absolute bottom-3 left-3" :class="card.lightText ? 'text-white' : 'text-ink'">
                <p class="text-sm font-semibold">{{ card.title }}</p>
                <p class="text-[11px]" :class="card.lightText ? 'text-white/80' : 'text-ink/60'">
                  {{ card.subtitle }}
                </p>
              </div>

              <div v-else class="relative flex h-full flex-col justify-between">
                <p class="text-xs uppercase tracking-[0.2em] text-ink/40">{{ card.brand }}</p>
                <h1 class="text-lg font-semibold text-ink">{{ card.headline }}</h1>
                <p class="text-xs text-ink/60">{{ card.description }}</p>
                <div class="text-ink">
                  <p class="text-sm font-semibold">{{ card.title }}</p>
                  <p class="text-[11px] text-ink/60">{{ card.subtitle }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <transition name="hero" mode="out-in">
            <div
              :key="activeSlide.id"
              class="glass-card relative h-44 w-full overflow-hidden rounded-3xl"
            >
              <img :src="activeSlide.image" :alt="activeSlide.title" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent"></div>
              <div class="absolute left-5 top-6 text-white">
                <p class="text-xs uppercase tracking-[0.2em] text-white/70">Featured</p>
                <h3 class="mt-2 text-lg font-semibold">{{ activeSlide.title }}</h3>
                <p class="mt-1 text-sm text-white/80">{{ activeSlide.subtitle }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <router-link
        to="/menu"
        class="mt-6 w-full rounded-2xl bg-accent py-3 text-center text-sm font-semibold text-white shadow-[0_20px_40px_-25px_rgba(255,92,66,0.9)]"
      >
        Get Started
      </router-link>
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
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    lightText: true
  },
  {
    id: "drinks",
    title: "Drinks",
    subtitle: "Cold brew and teas",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80",
    lightText: true
  },
  {
    id: "dessert",
    title: "Dessert",
    subtitle: "Sweet coconut treats",
    image: "https://d122axpxm39woi.cloudfront.net/images/guides/origin/639a8bbe29d86.jpg?auto=format&fit=crop&w=900&q=80",
    lightText: true
  },
  {
    subtitle: "Daily chef picks",
    brand: "EZMENU",
    headline: "Fresh bites, fast checkout.",
    description: "Pick favorites and order in minutes.",
    glass: true,
    lightText: false
  }
];

const slides = [
  {
    id: "lok-lak",
    title: "Lok Lak Bowl",
    subtitle: "Pepper-lime beef with crisp greens",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "amok",
    title: "Amok Curry",
    subtitle: "Coconut fish curry with herbs",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "lemongrass",
    title: "Lemongrass Noodles",
    subtitle: "Silky noodles with herb oil",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80"
  }
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
