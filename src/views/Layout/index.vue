<script setup lang="ts">
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutAside from '@/views/Layout/components/LayoutAside.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
<!--      头部-->
      <el-header>
        <LayoutNav/>
      </el-header>
      <el-container>
<!--        侧栏-->
        <el-aside width="200px">
          <LayoutAside/>
        </el-aside>
<!--        主要内容-->
        <el-main>
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
</style>
