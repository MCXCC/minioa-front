import { http } from '@/utils/http'

import { departmentItem } from '@/types/default'

export const departmentAPI = () => {
  const query = () => {
    return http<[departmentItem]>({
      url: '/department',
      method: 'GET'
    })
  }

  const add = (departmentData:departmentItem) => {
    return http({
      url: '/department',
      method: 'POST',
      data: departmentData
    })
  }

  const del = (id: number) => {
    return http({
      url: '/department',
      method: 'DELETE',
      params: { id: id }
    })
  }

  const update = (departmentData:departmentItem) => {
    return http({
      url: '/department',
      method: 'PUT',
      data: departmentData
    })
  }

  return {
    query,
    add,
    del,
    update
  }
}
