import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import CompanionsList from '../pages/CompanionsList.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/companions',
    name: 'companions',
    component: CompanionsList
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
