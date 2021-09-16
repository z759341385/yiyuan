import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue"),
    meta: { title: "首页" }
  },
  {
    path: "/",
    name: "PatientsList",
    component: () => import(/* webpackChunkName: "patients-list" */ "@/views/patients/list/index.vue"),
    meta: { title: "患者简介" }
  },
  {
    path: "/patients/:id",
    name: "PatientsDetail",
    component: () => import(/* webpackChunkName: "patients-detail" */ "@/views/patients/detail/index.vue"),
    meta: { title: "患者详情" }
  },
  {
    path: "/nursing/operation",
    name: "NursingOperation",
    component: () => import(/* webpackChunkName: "nursing-operation" */ "@/views/nursing/operation/index.vue"),
    meta: { title: "护理运转" }
  },
  {
    path: "/nursing/station",
    name: "NursingStation",
    component: () => import(/* webpackChunkName: "nursing-station" */ "@/views/nursing/station/index.vue"),
    meta: { title: "护理站" }
  },
  {
    path: "/nursing/info",
    name: "NursingInfo",
    component: () => import(/* webpackChunkName: "nursing-info" */ "@/views/nursing/info/index.vue"),
    meta: { title: "护理标识" }
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: () => import(/* webpackChunkName: "schedule" */ "@/views/schedule/index.vue"),
    meta: { title: "排程信息" }
  },
  {
    path: "/fire/info",
    name: "FireInfo",
    component: () => import(/* webpackChunkName: "fire" */ "@/views/fire/index.vue"),
    meta: { title: "消防信息" }
  },
  {
    path: "/risk",
    name: "RiskRecord",
    component: () => import(/* webpackChunkName: "risk" */ "@/views/risk/index.vue"),
    meta: { title: "风险评估" }
  },
  {
    path: "/announcement/home",
    name: "AnnouncementHome",
    component: () => import(/* webpackChunkName: "announcement-home" */ "@/views/announcement/home/index.vue"),
    meta: { title: "公告信息" }
  },
  {
    path: "/announcement/detail/:id",
    name: "AnnouncementDetail",
    component: () => import(/* webpackChunkName: "announcement-detail" */ "@/views/announcement/detail/index.vue"),
    meta: { title: "公告详情" }
  },
  {
    path: "/infusion",
    name: "Infusion",
    component: () => import(/* webpackChunkName: "patients-list" */ "@/views/infusion/index.vue"),
    meta: { title: "输液监控中心" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
