import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
