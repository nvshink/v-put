import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/flights",
    name: "flights",
    component: () => import("./components/FlightsList")
  },
  {
    path: "/flights/:id",
    name: "flight-details",
    component: () => import("./components/Flight")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddFlight")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;