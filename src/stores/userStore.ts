import { defineStore } from 'pinia/dist/pinia'
import { loginAPI } from '@/apis/user'
import { ref } from 'vue'
import { userinfoItem } from '@/types/default'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<userinfoItem>({ avatarUrl: '', token: '', name: '', workNumber: '' })
  const getUserInfo = async ({ workNumber, password }: { workNumber: string, password: string }) => {
    const res = await loginAPI({ workNumber, password })
    userInfo.value = res.data as unknown as userinfoItem
  }

  const clearUserinfo = () => {
    userInfo.value = { avatarUrl: '', token: '', name: '', workNumber: '' }
  }

  return {
    userInfo,
    getUserInfo,
    clearUserinfo
  }
}, {
  persist: true
})
