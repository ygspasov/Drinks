import Vue from "vue";
import VueRouter from "vue-router";
import AddDrink from "../components/AddDrink.vue";
import AllDrinks from "../components/AllDrinks.vue";
import EditDrink from "../components/EditDrink.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "AllDrinks",
    component: AllDrinks
  },
  {
    path: "/adddrink",
    name: "AddDrink",
    component: AddDrink
  },
  {
    path: "/editdrink/:slug",
    name: "EditDrink",
    component: EditDrink
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
