import App from './App';
import store from './store';
import uView from '@/uni_modules/uview-ui';
Vue.use(uView);
import apis from '@/apis';
Vue.prototype.$apis = apis;

// #ifndef VUE3
import Vue from 'vue';
Vue.config.productionTip = false;
App.mpType = 'app';
const app = new Vue({
  ...App,
  store,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue';
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
