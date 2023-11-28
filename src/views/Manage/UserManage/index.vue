<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue'
import { userAPI } from '@/apis/user'
import { postAPI } from '@/apis/post'
import { departmentAPI } from '@/apis/department'
import { lineAPI } from '@/apis/line'
import { userItem, postItem, lineItem, departmentItem } from '@/types/default'

const user = userAPI()
const post = postAPI()
const line = lineAPI()
const department = departmentAPI()
const userData = ref<[userItem]>()
const postData = ref<[postItem]>()
const lineData = ref<[lineItem]>()
const departmentData = ref<[departmentItem]>()
const visible = ref(false)
const search = ref('')

const getUserData = async () => {
  const res = await user.query()
  userData.value = res.data
  console.log(userData.value)
}

const getPostData = async () => {
  const res = await post.query()
  postData.value = res.data
  console.log(postData.value)
}

const getLineData = async () => {
  const res = await line.query()
  lineData.value = res.data
  console.log(lineData.value)
}

const getDepartmentData = async () => {
  const res = await department.query()
  departmentData.value = res.data
  console.log(departmentData.value)
}

onMounted(() => {
  getUserData()
})

const handleEdit = (index: number, row: postItem) => {
  console.log(index, row)
}
const handleDelete = async (index: number, row: postItem) => {
  await user.del(row.id)
  await getUserData()
}

const filterTableData = computed(() =>
  userData.value?.filter(
    (data) => !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.workNumber.toLowerCase().includes(search.value.toLowerCase())
  ) as [userItem]
)

const form = reactive({
  workNumber: 'D',
  name: '',
  post: '',
  line: '',
  department: ''
})

const clearForm = () => {
  form.name = ''
  form.department = ''
  form.line = ''
  form.post = ''
  form.workNumber = 'D'
}

const createNew = () => {
  clearForm()
  visible.value = true
  getPostData()
  getLineData()
  getDepartmentData()
}

const onSubmit = async () => {
  console.log(form)
  await user.add(form as unknown as userItem)
  await getUserData()
  visible.value = false
}

</script>

<template>
  <el-popover :visible="visible" style="text-align: right;" placement="right" :width="400" trigger="click">
    <template #reference>
      <el-button type="primary" style="margin-right: 16px" @click="createNew">新建员工</el-button>
    </template>
    <el-form :model="form" label-width="120px">
      <el-form-item required label="工号">
        <el-input v-model="form.workNumber"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item required label="岗位">
        <el-select v-model="form.post" value-key="id" placeholder="Select">
          <el-option
            v-for="item in postData"
            :key="item.id"
            :label="item.title"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item required label="所属线路">
        <el-select v-model="form.line" value-key="id" placeholder="Select">
          <el-option
            v-for="item in lineData"
            :key="item.id"
            :label="item.title"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item required label="部门">
        <el-select v-model="form.department" value-key="id" placeholder="Select">
          <el-option
            v-for="item in departmentData"
            :key="item.id"
            :label="item.title"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="visible=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-popover>
  <el-table :data="filterTableData " height="250" style="width: 100%">
    <el-table-column prop="workNumber" label="工号" width="auto"/>
    <el-table-column prop="name" label="姓名" width="auto"/>
    <el-table-column prop="post.title" label="岗位" width="auto"/>
    <el-table-column prop="line.title" label="所属线路" width="auto"/>
    <el-table-column prop="department.title" label="部门" width="auto"/>
    <el-table-column prop="createTime" label="创建时间" width="auto"/>
    <el-table-column prop="updateTime" label="更新时间" width="auto"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索"/>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-popconfirm title="确定要删除该员工吗？" confirm-button-text="确定" cancel-button-text="取消"
                       @confirm="handleDelete(scope.$index, scope.row)">
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
