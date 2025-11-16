import { createRouter, createWebHashHistory } from 'vue-router'
import main from '@/views/main/main.vue'
import login from '@/views/login/login.vue'
import { useAuthStore } from '@/stores/auth'
import add_event from '@/views/frame/add_event.vue'
import frame from '@/views/frame/frame.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/frame',
      component: main,
      children: [
        { path: '/frame', name: 'frame', component: frame },
        {
          path: '/add_event',
          name: 'add_event',
          component: add_event
        }
      ]

    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },

  ],
})
router.beforeEach((to, from) => {
  const AuthStore = useAuthStore()
  if (!AuthStore.is_logined && to.name !== 'login') {
    return { name: 'login' }
  }
})
export default router
