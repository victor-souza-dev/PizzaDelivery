import { authGuard } from "@/guards/authGuard";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/cart",
    name: "CartView",
    component: () => import("../views/CartView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/success",
    name: "SuccessView",
    component: () => import("../views/SuccessView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/users",
    name: "UsersView",
    component: () => import("../views/UsersView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/products",
    name: "ProductsView",
    component: () => import("../views/ProductsView.vue"),
    beforeEnter: authGuard,
  },
  {
    path: "/registerUser",
    name: "RegisterUserView",
    component: () => import("../views/RegisterUserView.vue"),
  },
  {
    path: "/registerProduct",
    name: "RegisterProductView",
    component: () => import("../views/RegisterProductView.vue"),
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
