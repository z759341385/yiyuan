import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/home/index.vue";
import PatientsList from "../views/patients/list/index.vue";
import PatientsDetail from "../views/patients/detail/index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/patients",
    name: "PatientsList",
    component: PatientsList
  },
  {
    path: "/patients/:id(\\d+)",
    name: "PatientsDetail",
    component: PatientsDetail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
