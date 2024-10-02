import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/LoginView.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/YourProfileView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/RegisterView.vue'),
  },
  {
    path: '/howto',
    name: 'HowTo',
    component: () => import(/* webpackChunkName: "about" */ '@/views/HowDoesItWorkView.vue'),
  },
  {
    path: '/offices',
    name: 'Offices',
    component: () => import(/* webpackChunkName: "about" */ '@/views/OfficesView.vue'),
  },
  {
    path: '/found',
    name: 'Found Items',
    component: () => import(/* webpackChunkName: "about" */ '@/views/FoundItemsView.vue'),
  },
  {
    path: '/offices/:id',
    name: 'office',
    component: import(/* webpackChunkName: "about" */ '@/views/OfficeView.vue'),
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
