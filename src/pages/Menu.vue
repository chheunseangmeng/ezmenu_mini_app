<template>
  <section class="relative px-5 pb-28 pt-6">
    <div class="mx-auto max-w-xl">
      <div class="mb-3 flex items-center justify-between gap-3">
        <h2 class="text-xl text-ink">Order Menu</h2>
        <button
          class="relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition duration-200"
          :class="showFavorites
            ? 'border-transparent bg-rose-500 text-white shadow-[0_10px_25px_-16px_rgba(244,63,94,0.95)]'
            : 'border-white/70 bg-white/75 text-ink/70 hover:bg-white'" @click="toggleFavoriteView">
            
          <!-- Favorite Count Badge -->
          <span v-if="favoriteCount > 0"
            class="absolute -top-2 -right-2 z-10 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold shadow-md"
            :class="showFavorites ? 'bg-white text-rose-500' : 'bg-rose-500 text-white'">
            {{ favoriteCount }}
          </span>

          <i :class="showFavorites ? 'fa-solid fa-chevron-left' : 'fa-regular fa-heart'"></i>
          {{ showFavorites ? "All Menu" : "My Favorite" }}
        </button>
      </div>

      <!-- Rest of the template remains the same -->
      <div class="mb-4">
        <label class="sr-only" for="menu-search">Search menu</label>
        <div class="glass-strong flex w-full items-center gap-3 rounded-2xl px-4 py-3">
          <i class="fa-solid fa-magnifying-glass text-ink/45"></i>
          <input id="menu-search" v-model="searchQuery" type="search" placeholder="Search the menu"
            class="w-full bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none" />
        </div>
      </div>

      <CategoryNav v-if="!showFavorites" :categories="categories" :active-category="activeCategory"
        @change="setCategory" />

      <!-- Toast transitions and other elements remain the same -->
      <transition name="toast">
        <div v-if="toast"
          class="fixed top-6 left-1/2 z-[70] -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-xs text-emerald-700 shadow-[0_20px_40px_-28px_rgba(16,185,129,0.9)] backdrop-blur-xl">
          <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
          {{ toast }}
        </div>
      </transition>

      <transition name="success">
        <div v-if="successToast"
          class="fixed top-14 left-1/2 z-[70] -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-4 py-2 text-xs text-emerald-700 shadow-[0_20px_40px_-28px_rgba(16,185,129,0.9)] backdrop-blur-xl">
          <span class="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white">
            <i class="fa-solid fa-check text-[10px]"></i>
          </span>
          Payment confirmed
        </div>
      </transition>

      <MenuGrid :items="items" :favorite-ids="favoriteIds" @add="add" @toggle-favorite="toggleFavorite" />
      <div v-if="showFavorites && items.length === 0"
        class="mt-5 rounded-2xl border border-dashed border-pebble/70 bg-cream/60 p-6 text-center text-sm text-ink/60">
        No favorites yet. Tap the heart icon on any menu item to save it here.
      </div>
    </div>

    <CartBar @open="openCart" />
    <CartModal :open="isCartOpen" @close="closeCart" @checkout="checkout" @removed="handleRemoved" />
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import CartBar from "../components/cart/CartBar.vue";
import CartModal from "../components/cart/CartModal.vue";
import CategoryNav from "../components/menu/CategoryNav.vue";
import MenuGrid from "../components/menu/MenuGrid.vue";
import { useCartStore } from "../stores/cartStore";
import { useMenuStore } from "../stores/menuStore";

const cart = useCartStore();
const menu = useMenuStore();
const searchQuery = ref("");
const showFavorites = ref(false);

// Add computed property for favorite count
const favoriteCount = computed(() => menu.favoriteIds.length);

const items = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  const base = showFavorites.value ? menu.favoriteItems : menu.filteredItems;
  if (!query) return base;
  return base.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });
});

// Rest of the script remains the same
const categories = computed(() => menu.categories);
const activeCategory = computed(() => menu.activeCategory);
const favoriteIds = computed(() => menu.favoriteIds);
const setCategory = (key) => menu.setCategory(key);
const toggleFavoriteView = () => {
  showFavorites.value = !showFavorites.value;
};
const toggleFavorite = (itemId) => {
  menu.toggleFavorite(itemId);
};
const add = (item) => {
  cart.addItem(item);
  const tg = window.Telegram?.WebApp;
  tg?.HapticFeedback?.impactOccurred?.("light");
};
const handleRemoved = (name) => {
  toast.value = `Removed ${name}`;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    toast.value = "";
  }, 1400);
};

const isCartOpen = ref(false);
const openCart = () => {
  isCartOpen.value = true;
};
const closeCart = () => {
  isCartOpen.value = false;
};

const toast = ref("");
let timer = null;

const lastAdded = computed(() => cart.lastAdded);
const lastAddedAt = computed(() => cart.lastAddedAt);

watch([lastAdded, lastAddedAt], () => {
  if (!lastAdded.value) return;
  toast.value = `Added ${lastAdded.value}`;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    toast.value = "";
  }, 1400);
});

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
  if (successTimer) clearTimeout(successTimer);
});

const checkout = () => {
  const tgApp = window.Telegram?.WebApp;
  tgApp?.HapticFeedback?.notificationOccurred?.("success");
  successToast.value = true;
  if (successTimer) clearTimeout(successTimer);
  successTimer = setTimeout(() => {
    successToast.value = false;
  }, 1800);
  cart.clear();
  isCartOpen.value = false;
};

const successToast = ref(false);
let successTimer = null;

const tg = window.Telegram?.WebApp;

onMounted(() => {
  if (!tg) return;
  tg.ready();
  tg.expand();
  tg.MainButton?.hide();
});

onBeforeUnmount(() => {
  tg?.MainButton?.hide();
});
</script>
