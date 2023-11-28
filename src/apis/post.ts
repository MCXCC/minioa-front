import { http } from '@/utils/http'

import { postItem } from '@/types/default'

export const postAPI = () => {
  const query = () => {
    return http<[postItem]>({
      url: '/post',
      method: 'GET'
    })
  }

  const add = (postData: postItem) => {
    return http({
      url: '/post',
      method: 'POST',
      data: postData
    })
  }

  const del = (id: number) => {
    return http({
      url: '/post',
      method: 'DELETE',
      params: { id: id }
    })
  }

  const update = (postData: postItem) => {
    return http({
      url: '/post',
      method: 'PUT',
      data: postData
    })
  }

  return {
    query,
    add,
    del,
    update
  }
}
