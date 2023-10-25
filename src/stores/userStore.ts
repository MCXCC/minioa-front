import { defineStore } from 'pinia/dist/pinia'
import { loginAPI } from '@/apis/user'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const getUserInfo = async (workNumber: string, password: string) => {
    const res = await loginAPI({ workNumber, password })
    userInfo.value = res.data
  }

  const clearUserinfo = () => {
    userInfo.value = {}
  }

  return {
    userInfo,
    getUserInfo,
    clearUserinfo
  }
}, {
  persist: true
})
