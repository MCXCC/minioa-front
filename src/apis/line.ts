import { lineItem } from '@/types/default'
import { defaultAPI } from '@/apis/default'

export const lineAPI = () => {
  const defaultLineAPI = defaultAPI<lineItem>('/line')
  return {
    ...defaultLineAPI
  }
}
