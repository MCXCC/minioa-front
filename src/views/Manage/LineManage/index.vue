<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue'
import { lineAPI } from '@/apis/line'
import { lineItem } from '@/types/default'

const line = lineAPI()
const visible = ref(false)
const search = ref('')
const lineDate = ref<[lineItem]>()
const getLineDate = async () => {
  const res = await line.query()
  lineDate.value = res.data
  console.log(lineDate.value)
}

onMounted(() => {
  getLineDate()
})

const handleEdit = (index: number, row: lineItem) => {
  console.log(index, row)
}
const handleDelete = async (index: number, row: lineItem) => {
  await line.del(row.id)
  await getLineDate()
}

const filterTableData = computed(() =>
  lineDate.value?.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  )
)
const form = reactive({
  title: ''
})

const onSubmit = async () => {
  await line.add(form as lineItem)
  await getLineDate()
  visible.value = false
}

</script>

<template>
  <el-popover :visible="visible" style="text-align: right;" placement="right" :width="400" trigger="click">
    <template #reference>
      <el-button type="primary" style="margin-right: 16px" @click="visible=true">新建线路</el-button>
    </template>
    <el-form :model="form" label-width="120px">
      <el-form-item label="线路名称">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="visible=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-popover>
  <el-table :data="filterTableData " style="width: 100%">
    <el-table-column prop="title" label="线路" width="180"/>
    <el-table-column prop="directorId" label="分管主任" width="180"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索"/>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-popconfirm title="确定要删除该线路吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete(scope.$index, scope.row)">
          <template #reference>
            <el-button
              size="small"
              type="danger">
              删除
            </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>
