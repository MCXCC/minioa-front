<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const router = useRouter()

onMounted(() => {
  router.push('/manage/department')
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
    <el-menu-item index="1" route="/manage/user">人员管理</el-menu-item>
    <el-menu-item index="2" route="/manage/department">部门管理</el-menu-item>
    <el-menu-item index="3" route="/manage/line">线路管理</el-menu-item>
    <el-menu-item index="4" route="/manage/post">岗位管理</el-menu-item>
  </el-menu>
  <RouterView/>
</template>

<style scoped>

</style>
