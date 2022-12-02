import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Главная - ищите билеты вместе с нами",
    }
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "Вход",
    }
  },
  {
    path: "/register",
    component: Register,
    meta: {
      title: "Регистрация",
    }
  },
  {
    path: "/add",
    name: "add",
    meta: {
      title: "Добавить рейс",
    },
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
    meta: {
      title: "Профиль",
    },
    component: () => import('./components/Profile.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      title: "Администрирование",
    },
    component: () => import('./components/BoardAdmin.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;