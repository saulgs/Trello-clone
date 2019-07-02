import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import SignUp from './views/SignUp.vue';
import Login from './views/Login.vue';
import Boards from './views/boards.vue';
import Board from './views/board.vue';

import modalCardInfo from './components/modalCardInfo';

import store from './store';

Vue.use(Router);

function isLoggedIn(to, from, next){
  store.dispatch('auth/authenticate').then(() => {
    next();
  }).catch(e => {
    next('/login');
  });
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component() {
        return import(/* webpackChunkName: "about" */ './views/About.vue');
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards,
      beforeEnter: isLoggedIn,
    },
    {
      path: '/boards/:id',
      name: 'board',
      component: Board,
      beforeEnter: isLoggedIn,
      children: [
        {
          path: 'card/:cardid',
          name: 'card',
          component: modalCardInfo
        }
      ],
    }
  ],
});
