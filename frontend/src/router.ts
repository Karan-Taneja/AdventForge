import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/pages/Auth.vue'),
  },
  {
    path: '/characters',
    name: 'Characters',
    component: () => import('@/pages/Characters.vue'),
  },
  {
    path: '/character/:characterId',
    name: 'CharacterSheet',
    component: () => import('@/pages/CharacterSheet.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
