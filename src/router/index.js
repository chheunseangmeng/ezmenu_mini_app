import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../pages/Welcome.vue";
import Menu from "../pages/Menu.vue";

const routes = [
  { path: "/", name: "welcome", component: Welcome },
  { path: "/menu", name: "menu", component: Menu }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
