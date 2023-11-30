import axios, { AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/userStore'

// 非组件使用router从@/router/index中引用，而不使用{userRouter}
import router from '@/router/index'

export const httpInstance = axios.create({
  baseURL: 'http://[2409:8a34:2060:faf0:5554:e843:39ee:3430]:5531',
  timeout: 5000
})

// 拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))

httpInstance.interceptors.response.use(
  res => res.data,
  error => {
    const userStore = useUserStore()
    console.log(error)
    if (error.response.status === 401) {
      error.response.data.message = '请先登录'
      userStore.clearUserinfo()
      router.push('/login')
    }
    if (error.response.status === 500) {
      error.response.data.message = '服务器错误，请联系管理员'
      ElMessage({
        type: 'error',
        message: error.response.data.message
      })
      return Promise.reject(error)
    }
    ElMessage({
      type: 'warning',
      message: error.response.data.message
    })
    return Promise.reject(error)
  }
)

// 默认返回类型
type Data<T> = {
  code: string,
  msg: string,
  data: T
}

export const http = <T>(config: AxiosRequestConfig<any>) => {
  return <Promise<Data<T>>>httpInstance(config)
}
