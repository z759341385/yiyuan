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
import AnnouncementHome from "../views/announcement/home/index.vue";
import AnnouncementDetail from "../views/announcement/detail/index.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "首页" }
  },
  {
    path: "/patients",
    name: "PatientsList",
    component: PatientsList,
    meta: { title: "患者简介" }
  },
  {
    path: "/patients/:id(\\d+)",
    name: "PatientsDetail",
    component: PatientsDetail,
    meta: { title: "患者详情" }
  },
  {
    path: "/nursing/operation",
    name: "NursingOperation",
    component: NursingOperation,
    meta: { title: "护理运转" }
  },
  {
    path: "/nursing/station",
    name: "NursingStation",
    component: NursingStation,
    meta: { title: "护理站" }
  },
  {
    path: "/nursing/info",
    name: "NursingInfo",
    component: NursingInfo,
    meta: { title: "护理标识" }
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule,
    meta: { title: "首页" }
  },
  {
    path: "/fire/info",
    name: "FireInfo",
    component: FireInfo,
    meta: { title: "消防信息" }
  },
  {
    path: "/risk",
    name: "RiskRecord",
    component: RiskRecord,
    meta: { title: "风险评估" }
  },
  {
    path: "/announcement/home",
    name: "AnnouncementHome",
    component: AnnouncementHome,
    meta: { title: "公告信息" }
  },
  {
    path: "/announcement/detail/:id(\\d+)",
    name: "AnnouncementDetail",
    component: AnnouncementDetail,
    meta: { title: "公告详情" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
