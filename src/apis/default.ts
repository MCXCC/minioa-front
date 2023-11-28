import { http } from '@/utils/http'

export const defaultAPI = <T>(url:string) => {
  const query = () => {
    return http<[T]>({
      url: url,
      method: 'GET'
    })
  }

  const add = (Data:T) => {
    return http({
      url: url,
      method: 'POST',
      data: Data
    })
  }

  const del = (id: number) => {
    return http({
      url: url,
      method: 'DELETE',
      params: { id: id }
    })
  }

  const update = (Data:T) => {
    return http({
      url: url,
      method: 'PUT',
      data: Data
    })
  }

  return {
    query,
    add,
    del,
    update
  }
}
