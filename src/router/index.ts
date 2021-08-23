import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/home/index.vue";
import PatientsList from "../views/patients/list/index.vue";
import PatientsDetail from "../views/patients/detail/index.vue";
import NursingOperation from "../views/nursing/operation/index.vue";
import NursingInfo from "../views/nursing/info/index.vue";
import NursingStation from "../views/nursing/station/index.vue";
import Schedule from "../views/schedule/index.vue";
import FireInfo from "../views/fire/index.vue";
import RiskRecord from "../views/risk/index.vue";

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
  },
  {
    path: "/nursing/operation",
    name: "NursingOperation",
    component: NursingOperation
  },
  {
    path: "/nursing/station",
    name: "NursingStation",
    component: NursingStation
  },
  {
    path: "/nursing/info",
    name: "NursingInfo",
    component: NursingInfo
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule
  },
  {
    path: "/fire/info",
    name: "FireInfo",
    component: FireInfo
  },
  {
    path: "/risk",
    name: "RiskRecord",
    component: RiskRecord
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
