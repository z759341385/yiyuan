import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/permission";
import store from "./store";
import moment from "moment";
// import { Button, Select, Option, Pagination } from "element-ui";
import ElementUI from "element-ui";
import * as echarts from "echarts/lib/echarts";

import "@/assets/icon/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";

import "./styles/app.less";
import "./styles/index.less";
import vGanttChart from "v-gantt-chart";

Vue.config.productionTip = false;

// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// Vue.component(Option.name, Option);
// Vue.component(Pagination.name, Pagination);
Vue.use(ElementUI);
Vue.use(vGanttChart);
Vue.prototype.$moment = moment;

import { GridComponent } from "echarts/components";
echarts.use([GridComponent]);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
