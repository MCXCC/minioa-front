<script setup lang="ts">
import { Document, Location, Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        style="width: 200px;"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="0"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1" disabled>
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>test</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item disabled index="2" @click="()=>router.push('/hr')">
          <el-icon>
            <icon-menu/>
          </el-icon>
          <span>员工管理</span>
        </el-menu-item>
        <el-menu-item @click="()=>router.push('/manage')" index="3">
          <el-icon>
            <document/>
          </el-icon>
          <span>人事管理</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <el-icon>
            <setting/>
          </el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>
