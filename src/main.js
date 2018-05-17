// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Webfont from 'webfontloader';
import App from './App';
import router from './router';
import store from './store';
import data from './assets/data';

Vue.config.productionTip = false;

Webfont.load({
  google: {
    families: ['Source Sans Pro:400,400i,600'],
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<router-view />',
  created() {
    this.$store.commit('setData', data);
    const params = this.$route.params;
    if (params.controller && params.id) {
      const current = data[`${params.controller}s`].find(i => i.id === parseInt(params.id, 10));
      this.$store.commit('setCurrent', current);
      this.$store.commit('setSelected', current);
    }
  },
});
