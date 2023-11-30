<script setup lang="ts">
</script>

<template>
  <el-row :gutter="10" justify="start">
    <el-col v-for="item in 50" :key="item" :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
      <RouterLink to="#">
        <div
          style="padding-top: 10px; background-color: #fff; height: 96px; margin-bottom: 10px;"
          class="grid-content ep-bg-purple-light">
          <div style="display: flex;justify-content: center;align-items: center;">
            <img style="height: 64px;width: 64px;" src="@/assets/images/logo.png" alt="">
          </div>
          <div style="display: flex;justify-content: center;align-items: center;">
            66
          </div>
        </div>
      </RouterLink>
    </el-col>
  </el-row>
</template>

<style scoped>

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
