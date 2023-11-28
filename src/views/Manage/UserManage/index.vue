<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue'
import { userAPI } from '@/apis/user'
import { userItem, postItem } from '@/types/default'

const user = userAPI()
const visible = ref(false)
const search = ref('')
const userDate = ref<[userItem]>()
const getPostDate = async () => {
  const res = await user.query()
  userDate.value = res.data
  console.log(userDate.value)
}

onMounted(() => {
  getPostDate()
})

const handleEdit = (index: number, row: postItem) => {
  console.log(index, row)
}
const handleDelete = async (index: number, row: postItem) => {
  await user.del(row.id)
  await getPostDate()
}

const filterTableData = computed(() =>
  userDate.value?.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.workNumber.toLowerCase().includes(search.value.toLowerCase())
  )
)
const form = reactive({
  workNumber: ''
})

const onSubmit = async () => {
  await user.add(form as userItem)
  await getPostDate()
  visible.value = false
}

</script>

<template>
  <el-popover :visible="visible" style="text-align: right;" placement="right" :width="400" trigger="click">
    <template #reference>
      <el-button type="primary" style="margin-right: 16px" @click="visible=true">新建员工</el-button>
    </template>
    <el-form :model="form" label-width="120px">
      <el-form-item label="工号">
        <el-input v-model="form.workNumber" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="visible=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-popover>
  <el-table :data="filterTableData " height="250" style="width: 100%">
    <el-table-column prop="workNumber" label="工号" width="auto"/>
    <el-table-column prop="workNumber" label="姓名" width="auto"/>
    <el-table-column prop="workNumber" label="岗位" width="auto"/>
    <el-table-column prop="workNumber" label="所属线路" width="auto"/>
    <el-table-column prop="workNumber" label="部门" width="auto"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索"/>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-popconfirm title="确定要删除该员工吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete(scope.$index, scope.row)">
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
