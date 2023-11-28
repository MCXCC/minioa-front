import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Test from '@/views/Test/index.vue'
import Manage from '@/views/Manage/index.vue'
import LineManage from '@/views/Manage/LineManage/index.vue'
import DepartmentManage from '@/views/Manage/DepartmentManage/index.vue'
import PostManage from '@/views/Manage/PostManage/index.vue'
import UserManage from '@/views/Manage/UserManage/index.vue'

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
            path: '/manage/line',
            component: LineManage
          },
          {
            path: '/manage/department',
            component: DepartmentManage
          },
          {
            path: '/manage/post',
            component: PostManage
          },
          {
            path: '/manage/user',
            component: UserManage
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
