<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const activeIndex = ref('3')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const router = useRouter()

onMounted(() => {
  router.push('/line')
})
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#F3F3F3FF"
    router="router">
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-menu-item index="2">Info</el-menu-item>
    <el-menu-item index="3" route="/line">线路管理</el-menu-item>
  </el-menu>
  <RouterView/>
</template>

<style scoped>

</style>
