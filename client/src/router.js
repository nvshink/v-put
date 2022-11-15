import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
    {
    path: "/add",
    name: "add",
    component: () => import("./components/AddFlight.vue")
  },
  {
    path: "/flights/:id",
    name: "flight",
    component: () => import("./components/Flight.vue")
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: () => import('./components/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // lazy-loaded
    component: () => import('./components/BoardAdmin.vue')
  },
  {
    path: '/user',
    name: 'user',
    // lazy-loaded
    component: () => import('./components/BoardUser.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;