<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const input = ref('')
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: ''
})

const onSubmit = () => {
  console.log('submit!')
}

const search = () => {
  if (input.value === '') {
    return
  }
  ElMessage({
    message: input.value
  })
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row justify="space-between">
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            <el-input @click="search()" v-model="input" class="w-50 m-2" placeholder="请输入员工的工号" clearable>
              <template #prefix>
                <el-icon class="el-input__icon">
                  <Search/>
                </el-icon>
              </template>
            </el-input>
          </el-col>
          <el-col :span="2">
            <div class="grid-content ep-bg-purple"/>
            <el-popover placement="right" :width="400" trigger="click">
              <template #reference>
                <div style="margin:auto 0;">
                  <el-button type="success" round>添加员工</el-button>
                </div>
              </template>
              <el-form :model="form" label-width="120px">
                <el-form-item label="Activity name">
                  <el-input v-model="form.name"/>
                </el-form-item>
                <el-form-item label="Activity zone">
                  <el-select v-model="form.region" placeholder="please select your zone">
                    <el-option label="Zone one" value="shanghai"/>
                    <el-option label="Zone two" value="beijing"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="Activity time">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="form.date1"
                      type="date"
                      placeholder="Pick a date"
                      style="width: 100%"
                    />
                  </el-col>
                  <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="11">
                    <el-time-picker
                      v-model="form.date2"
                      placeholder="Pick a time"
                      style="width: 100%"
                    />
                  </el-col>
                </el-form-item>
                <el-form-item label="Instant delivery">
                  <el-switch v-model="form.delivery"/>
                </el-form-item>
                <el-form-item label="Activity type">
                  <el-checkbox-group v-model="form.type">
                    <el-checkbox label="Online activities" name="type"/>
                    <el-checkbox label="Promotion activities" name="type"/>
                    <el-checkbox label="Offline activities" name="type"/>
                    <el-checkbox label="Simple brand exposure" name="type"/>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Resources">
                  <el-radio-group v-model="form.resource">
                    <el-radio label="Sponsor"/>
                    <el-radio label="Venue"/>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="Activity form">
                  <el-input v-model="form.desc" type="textarea"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">Create</el-button>
                  <el-button>Cancel</el-button>
                </el-form-item>
              </el-form>
            </el-popover>
          </el-col>
        </el-row>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<style scoped>

</style>
