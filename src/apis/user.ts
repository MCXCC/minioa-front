import { http } from '@/utils/http'
import { userItem } from '@/types/default'
import { defaultAPI } from '@/apis/default'

export const loginAPI = ({ workNumber, password }: { workNumber: string, password: string }) => {
  return http<string>({
    url: '/user/login',
    method: 'POST',
    data: {
      workNumber,
      password
    }
  })
}

export const userAPI = () => {
  const defaultUserAPI = defaultAPI<userItem>('/user')
  return {
    ...defaultUserAPI
  }
}
