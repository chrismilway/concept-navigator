import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: App,
    },
    {
      path: '/:controller/:id',
      component: App,
    },
    {
      path: '/:controller/:id/:view',
      component: App,
    },
  ],
});
