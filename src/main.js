import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import EventBus from './EventBus';
Vue.config.productionTip = false
// Vue.prototype.$$EventBus = new EventBus();
Vue.prototype.$$EventBus = EventBus;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
