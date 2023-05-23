import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Notes from '../views/Notes.vue';
import NoteProd from '../views/NoteProd.vue';
import {useApiStore} from "@/stores/index.js";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      title: 'Home'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
        requiresAuth: false,
        title: 'Login'
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    function() {
      useApiStore().logout().then(r => {
        console.log(r);
      });
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
        requiresAuth: false,
        title: 'Register'
    }
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes,
    meta: {
      requiresAuth: true,
        title: 'Notes'
    }
  },
  {
    path: '/notes/:id',
    name: 'NoteProd',
    component: NoteProd,
    meta: {
      requiresAuth: true,
        title: 'Manage Note'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = useApiStore().loggedIn;
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
