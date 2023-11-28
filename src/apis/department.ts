import { departmentItem } from '@/types/default'
import { defaultAPI } from '@/apis/default'

export const departmentAPI = () => {
  const defaultDepartmentAPI = defaultAPI<departmentItem>('/department')
  return {
    ...defaultDepartmentAPI
  }
}
