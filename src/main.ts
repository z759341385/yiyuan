import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/permission";
import store from "./store";
import moment from "moment";
import { Button, Select, Pagination } from "element-ui";

import "@/assets/icon/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";

import "./styles/app.less";
import "./styles/index.less";

Vue.config.productionTip = false;

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Pagination.name, Pagination);
Vue.prototype.$moment = moment;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
