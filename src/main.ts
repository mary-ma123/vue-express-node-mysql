import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./vuex/store";

Vue.config.productionTip = false;

import axios from 'axios'
Vue.prototype.$axios=axios //注意：挂载上去的名字不能等同于axios，使用$axio即可

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
