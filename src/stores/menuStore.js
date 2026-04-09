import { defineStore } from "pinia";

export const useMenuStore = defineStore("menu", {
  state: () => ({
    categories: [
      { key: "all", label: "All" },
      { key: "foods", label: "Food" },
      { key: "drinks", label: "Drinks" },
      { key: "desserts", label: "Desserts" }
    ],
    items: [
      {
        id: 1,
        name: "Amok",
        description: "Coconut fish curry with herbs",
        category: "foods",
        price: 5.5,
        priceKHR: 22000,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 2,
        name: "Bay Cha",
        description: "Stir-fried beef with basil",
        category: "foods",
        price: 4.25,
        priceKHR: 17000,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 3,
        name: "Ice Latte",
        description: "Chilled espresso with milk",
        category: "drinks",
        price: 3.0,
        priceKHR: 12000,
        image:
          "https://images.unsplash.com/photo-1481391032119-d89fee407e44?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 4,
        name: "Matcha",
        description: "Smooth matcha with milk",
        category: "drinks",
        price: 3.25,
        priceKHR: 13000,
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 5,
        name: "Nom",
        description: "Traditional Khmer dessert",
        category: "desserts",
        price: 2.5,
        priceKHR: 10000,
        image:
          "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 6,
        name: "Lok Lak Bowl",
        description: "Pepper-lime beef with crisp greens",
        category: "foods",
        price: 6.25,
        priceKHR: 25000,
        image:
          "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 7,
        name: "Lemongrass Noodles",
        description: "Silky rice noodles with herb oil",
        category: "foods",
        price: 4.75,
        priceKHR: 19000,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 8,
        name: "Sparkling Lime",
        description: "Citrus soda with mint",
        category: "drinks",
        price: 2.4,
        priceKHR: 9600,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 9,
        name: "Coconut Coffee",
        description: "Cold brew with coconut cream",
        category: "drinks",
        price: 3.6,
        priceKHR: 14500,
        image:
          "https://i0.wp.com/www.teacoffeecup.com/wp-content/uploads/2020/06/Coconut-cream-coffee.jpeg?fit=640%2C800&ssl=1"
      },
      {
        id: 10,
        name: "Palm Sugar Pudding",
        description: "Silky dessert with toasted coconut",
        category: "desserts",
        price: 2.95,
        priceKHR: 11800,
        image:
          "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 11,
        name: "Mango Sticky Rice",
        description: "Sweet mango with coconut rice",
        category: "desserts",
        price: 3.5,
        priceKHR: 14000,
        image:
          "https://allwaysdelicious.com/wp-content/uploads/2025/06/sticky-rice-mango-sq.jpg"
      }
    ],
    activeCategory: "all",
    favoriteIds: []
  }),
  getters: {
    filteredItems: (state) => {
      if (state.activeCategory === "all") return state.items;
      return state.items.filter((i) => i.category === state.activeCategory);
    },
    favoriteItems: (state) => state.items.filter((item) => state.favoriteIds.includes(item.id))
  },
  actions: {
    setCategory(category) {
      this.activeCategory = category;
    },
    toggleFavorite(itemId) {
      if (this.favoriteIds.includes(itemId)) {
        this.favoriteIds = this.favoriteIds.filter((id) => id !== itemId);
        return;
      }
      this.favoriteIds = [...this.favoriteIds, itemId];
    }
  }
});
