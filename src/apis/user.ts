import { http } from '@/utils/http'

export const loginAPI = ({ workNumber, password }:{workNumber:string, password:string}) => {
  return http<string>({
    url: '/login',
    method: 'POST',
    data: {
      workNumber,
      password
    }
  })
}
