import { httpInstance, http } from '@/utils/http'

export function loginAPI ({ workNumber, password }:{workNumber:string, password:string}) {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      workNumber,
      password
    }
  })
}

export function loginAPIs ({ workNumber, password }:{workNumber:string, password:string}) {
  return http<string>({
    url: '/login',
    method: 'POST',
    data: {
      workNumber,
      password
    }
  })
}
