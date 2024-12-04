import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import beforeEach from './beforeEach.js'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      meta: { requiresAuth: true},
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

router.beforeEach(beforeEach)

export default router
