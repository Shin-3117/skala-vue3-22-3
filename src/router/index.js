import { createRouter, createWebHistory } from 'vue-router'
import WeatherView from '@/views/WeatherView.vue'

// 목록(홈)에서 마지막으로 보고 있던 스크롤 위치.
// router.push('/') 는 새 히스토리 항목이라 savedPosition 이 없으므로 직접 기억해 둔다.
let homeScrollTop = 0

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
  // 라우트 이동 시 스크롤 위치 제어
  scrollBehavior(to, from, savedPosition) {
    // 홈으로 돌아올 때는 보고 있던 위치를 유지
    if (to.name === 'home') {
      return savedPosition ?? { top: homeScrollTop }
    }
    // 뒤로/앞으로 가기는 브라우저가 기억한 위치를 복원
    if (savedPosition) return savedPosition
    // 그 외(상세 페이지 진입 등)에는 맨 위로
    return { top: 0 }
  },
})

// 홈을 떠나기 직전의 스크롤 위치를 저장
router.beforeEach((to, from) => {
  if (from.name === 'home') {
    homeScrollTop = window.scrollY
  }
})

export default router
