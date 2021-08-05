// import Vue from "vue";
// import Vuex from "vuex";
// import getters from "./getters";
// import app from "./modules/app";
// import user from "./modules/user";

// Vue.use(Vuex);

// const store = new Vuex.Store({
//   modules: {
//     app,
//     user,
//   },
//   getters,
// });

// export default store;

import Vue from "vue";
import Vuex from "vuex";
import { AppState } from "./modules/app";
import { UserState } from "./modules/user";

Vue.use(Vuex);

export interface RootState {
  app: AppState;
  user: UserState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({});
