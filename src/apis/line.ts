import { http } from '@/utils/http'

import { lineItem } from '@/types/default'

export const lineAPI = () => {
  const query = () => {
    return http<lineItem>({
      url: '/line',
      method: 'PUT',
      headers: {
        token: '123456'
      }
    })
  }

  const add = () => {
    return http({
      url: '/line',
      method: 'POST'
      // data: {}
    })
  }

  return {
    query,
    add
  }
}
