import { postItem } from '@/types/default'
import { defaultAPI } from '@/apis/default'

export const postAPI = () => {
  const defaultPostAPI = defaultAPI<postItem>('/post')
  return {
    ...defaultPostAPI
  }
}
