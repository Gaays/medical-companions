import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import CompanionsList from '../pages/CompanionsList.vue';
import NewsList from '../pages/NewsList.vue';
import NewsArticle from '../pages/NewsArticle.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/services',
    name: 'services',
    component: CompanionsList
  },
  {
    path: '/companions',
    redirect: '/services'
  },
  {
    path: '/news',
    name: 'news',
    component: NewsList
  },
  {
    path: '/news/:slug',
    name: 'news-article',
    component: NewsArticle
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
