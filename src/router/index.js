import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
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
    component: () => import(/* webpackChunkName: "howto" */ '@/views/HowDoesItWorkView.vue'),
  },
  {
    path: '/offices',
    name: 'Offices',
    component: () => import(/* webpackChunkName: "offices" */ '@/views/OfficesView.vue'),
  },
  {
    path: '/found',
    name: 'Found Items',
    component: () => import(/* webpackChunkName: "foundItems" */ '@/views/FoundItemsView.vue'),
  },
  {
    path: '/offices/:id',
    name: 'office',
    component: import(/* webpackChunkName: "about" */ '@/views/OfficeView.vue'),
  },
  {
    path: '/found/:id', 
    name: 'ItemDetails',
    component: () => import(/* webpackChunkName: "itemDetails" */ '@/views/ItemDetailsView.vue'),
    props: true,
  },
  {
    path: '/review',
    name: 'Add review',
    component: () => import(/* webpackChunkName: "about" */ '@/views/AddReviewView.vue'),
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: () => import(/* webpackChunkName: "login" */ '@/views/FAQView.vue'),
  },
  {
    path: '/ask',
    name: 'Ask a question',
    component: () => import(/* webpackChunkName: "login" */ '@/views/AskQuestionView.vue'),
  },
  {
    path: '/rules',
    name: 'Rules of our service',
    component: () => import(/* webpackChunkName: "login" */ '@/views/RulesView.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "login" */ '@/views/NotFoundView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
