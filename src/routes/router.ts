import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [{
    name: 'Todos',
    path: '/',
    component: () => import('@/pages/TodosPage.vue'),
  }],
});
