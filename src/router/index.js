import Vue from "vue";
import VueRouter from "vue-router";
import Registration from "../components/Registration.vue";
import Login from "../components/Login.vue";
import Todo from "../components/Todo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration
  },
  {
    path: "/todo",
    name: "Todo",
    component: Todo
  }
];

const router = new VueRouter({
  routes
});

export default router;
