import { http } from '@/utils/http'

import { lineItem } from '@/types/default'

export const lineAPI = () => {
  const query = () => {
    return http<[lineItem]>({
      url: '/line',
      method: 'GET'
    })
  }

  const add = (lineData:lineItem) => {
    return http({
      url: '/line',
      method: 'POST',
      data: lineData
    })
  }

  const del = (id: number) => {
    return http({
      url: '/line',
      method: 'DELETE',
      params: { id: id }
    })
  }

  const update = (lineData:lineItem) => {
    return http({
      url: '/line',
      method: 'PUT',
      data: lineData
    })
  }

  return {
    query,
    add,
    del,
    update
  }
}
