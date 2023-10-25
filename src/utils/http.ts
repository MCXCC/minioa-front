import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { Config } from '@/config'

export const httpInstance = axios.create({
  baseURL: 'http://' + Config.BACKEND_HOST + ':' + Config.BACKEND_PORT,
  timeout: 5000
})

// 拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  // const token = userStore.userInfo.token
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config
}, error => Promise.reject(error))

httpInstance.interceptors.response.use(
  res => res.data,
  error => {
    const userStore = useUserStore()
    const router = useRouter()
    console.log('66')
    ElMessage({
      type: 'warning',
      message: error.response.data.message
    })
    if (error.response.status === 401) {
      userStore.clearUserinfo()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

// 默认返回类型
type Data<T>={
  code:string,
  message:string,
  data:T
}

export const http = <T>(config: AxiosRequestConfig<any>) => {
  return <Promise<Data<T>>>httpInstance(config)
}
