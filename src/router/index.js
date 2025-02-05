import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import beforeEach from './beforeEach.js'
import TheContainer from '@/components/TheContainer.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'Home',
      component: TheContainer,
      meta: { requiresAuth: true},
      children: [
        {
          path: '',
          name: 'About',
          component: () => import('../views/AboutView.vue')
        },
        {
          path: '/chat',
          name: 'Chat',
          component: () => import('../views/ChatView.vue')
        },
        {
          path: '/perfil',
          meta: { requiresAuth: true},
          component: () => import('../views/user/UserView.vue')
        }
      ]
    },
  ],
})

router.beforeEach(beforeEach)

export default router
