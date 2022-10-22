import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/flights",
    name: "flights",
    component: () => import("./components/Flights.vue")
  },
  {
    path: "/flights/:id",
    name: "flight-details",
    component: () => import("./components/Flight.vue")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddFlight.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;