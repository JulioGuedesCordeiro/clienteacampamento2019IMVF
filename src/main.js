// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/scss/app.scss';
import Router from 'vue-router';
import locale from 'element-ui/lib/locale/lang/pt-br';
import BootstrapVue from 'bootstrap-vue';
import ElementUI from 'element-ui';
import Vue from 'vue';
import App from './App.vue';
import router from './../router';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale, size: 'small', zIndex: 3000 });
Vue.use(Router);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

