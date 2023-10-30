<script setup lang="ts">
import { lineAPI } from '@/apis/line'

const Test1 = async () => {
  const line = lineAPI()
  const res = await line.query()
  console.log(res)
}
</script>

<template>
  <el-button @click="Test1()" type="success">
    测试按钮1
  </el-button>
  <el-button type="success">
    测试按钮2
  </el-button>
</template>

<style scoped>

</style>
