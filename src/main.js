// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui'; 
import store from './store';
import axios from 'axios';
import $ from 'jquery';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import {get,post} from "./utils/http"
Vue.prototype.axios = axios;
Vue.prototype.$ = $;
Vue.prototype.http = {
  get,
  post
}
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  //路由
  router,
  store,
  components: { App },
  template: '<App/>'
})
