import Vue from 'vue';
import Router from 'vue-router';
import GMap from '@/components/home/GMap.vue';
import Signup from '@/components/auth/Signup.vue';
import Login from '@/components/auth/Login.vue';
import firebase from 'firebase';

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ],
});

router.beforeEach((to, from, next) => {

  if(to.matched.some(rec => rec.meta.requiresAuth)){

    let user = firebase.auth().currentUser;
    if(user){
      next();
    } else {
      next({ name: 'login'});
    }
  } else {
    next()
  }
})

export default router
