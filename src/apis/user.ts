import { http } from '@/utils/http'
import { userItem } from '@/types/default'

export const loginAPI = ({ workNumber, password }: { workNumber: string, password: string }) => {
  return http<string>({
    url: '/login',
    method: 'POST',
    data: {
      workNumber,
      password
    }
  })
}
export const userAPI = () => {
  const query = () => {
    return http<[userItem]>({
      url: '/user',
      method: 'GET'
    })
  }

  const add = (userData: userItem) => {
    return http({
      url: '/user',
      method: 'POST',
      data: userData
    })
  }

  const del = (id: number) => {
    return http({
      url: '/user',
      method: 'DELETE',
      params: { id: id }
    })
  }

  const update = (userData: userItem) => {
    return http({
      url: '/user',
      method: 'PUT',
      data: userData
    })
  }

  return {
    query,
    add,
    del,
    update
  }
}
