import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Test from '@/views/Test/index.vue'
import Manage from '@/views/Manage/index.vue'
import LineManage from '@/views/Manage/components/LineManage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/manage',
        component: Manage,
        children: [
          {
            path: '/line',
            component: LineManage
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
