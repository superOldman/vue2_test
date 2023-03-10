import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import EventBus from './EventBus';
import Directives from './directives';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import textOverflow2 from '@kimi_org/textoverflow/text-overflow.common.js'


import '@/styles/index.less';
Vue.config.productionTip = false;
Vue.prototype.$$EventBus = EventBus;

Vue.use(Directives);

// Vue.use(textOverflow2)
// Vue.config.devtools = true

// 全局自定义指令
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
