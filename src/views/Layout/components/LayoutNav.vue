<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const activeIndex = ref('1')
// 是否登录
const isLogin = ref(false)
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const signOut = () => {
  userStore.clearUserinfo()
  isLogin.value = !!userStore.userInfo.token
}

onMounted(() => {
  isLogin.value = !!userStore.userInfo.token
})
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    unique-opened="unique-opened"
  >
    <el-menu-item index="0">
      <img
        style="width: 100px"
        src="@/assets/images/logo.png"
        alt="Element logo"
      />
    </el-menu-item>
    <!--    间隔-->
    <div style="flex-grow: 0.1"/>
    <el-menu-item index="1">
      <RouterLink to="/">主页</RouterLink>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>工具</template>
      <el-menu-item index="2-1">接触网状态快速分析工具</el-menu-item>
      <el-menu-item index="2-2" disabled>item two</el-menu-item>
      <el-menu-item index="2-3" disabled>item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>开发测试</template>
        <el-menu-item index="2-4-1" @click="()=>{router.push('/test')}">接口测试</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <!--    间隔-->
    <div style="flex-grow: 1"/>
    <div class="user">
      <el-avatar v-if="isLogin"
        :src="userStore.userInfo.avatarUrl?userStore.userInfo.avatarUrl:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
      />
      <span v-if="isLogin">你好! {{ userStore.userInfo.workNumber }} {{ userStore.userInfo.name }}</span>
      <span v-else>请先登录</span>
      <div class="button">
        <el-button v-if="isLogin" type="danger" round @click="signOut()">退出登录</el-button>
        <el-button v-else type="primary" round>
          <RouterLink to="/login">登录</RouterLink>
        </el-button>
      </div>
    </div>

  </el-menu>
</template>

<style scoped>
.user {
  display: flex;
  margin: auto;
}

.user span {
  margin-right: 20px;

  line-height: 42px;
}

.user .button {
  margin: auto;
}
</style>
