import { createRouter, createWebHistory } from 'vue-router'
import WeatherView from '@/views/WeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WeatherView,
    },
    {
      path: '/weather/:cityId',
      name: 'weather-detail',
      component: () => import('@/views/WeatherDetailView.vue'),
      props: true,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
