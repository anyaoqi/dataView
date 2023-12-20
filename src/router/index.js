import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

export default router
