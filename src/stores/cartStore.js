import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    lastAdded: "",
    lastAddedAt: 0
  }),
  getters: {
    total: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    totalKHR: (state) => state.items.reduce((sum, i) => sum + i.priceKHR * i.quantity, 0),
    count: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0)
  },
  actions: {
    addItem(item) {
      const existing = this.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
      this.lastAdded = item.name;
      this.lastAddedAt = Date.now();
    },
    increment(id) {
      const existing = this.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity += 1;
      }
    },
    decrement(id) {
      const existing = this.items.find((i) => i.id === id);
      if (!existing) return;
      existing.quantity -= 1;
      if (existing.quantity <= 0) {
        this.removeItem(id);
      }
    },
    removeItem(id) {
      this.items = this.items.filter((i) => i.id !== id);
    },
    clear() {
      this.items = [];
    }
  }
});
