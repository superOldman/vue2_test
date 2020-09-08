import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import EventBus from './EventBus';
Vue.config.productionTip = false
// Vue.prototype.$$EventBus = new EventBus();
Vue.prototype.$$EventBus = EventBus;


// 全局自定义指令
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
