import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store";
const routes = [
  {
    path: "/",
    name: "login",
    component: HomeView,
  },
  {
    path: "/map",
    name: "map",
    component: () => import("../views/MapView.vue"),
    meta: {
      loginRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const tokenPresent = store.getters.storeToken;
  if (to.meta?.loginRequired && !tokenPresent) {
    next({ name: "login" });
  } else if (!to.meta?.loginRequired && tokenPresent) {
    next({ name: "map" });
  } else {
    next();
  }
});

export default router;
