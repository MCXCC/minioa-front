<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue'
import { postAPI } from '@/apis/post'
import { postItem } from '@/types/default'

const postData = ref<[postItem]>()
const visible = ref({
  create: false,
  edit: false
})
const search = ref('')
const form = reactive({
  create: {
    title: ''
  },
  edit: {
    id: '',
    title: ''
  }
})

const getPostData = async () => {
  const res = await postAPI().query()
  postData.value = res.data
  console.log(postData.value)
}

onMounted(() => {
  getPostData()
})

const handleDelete = async (index: number, row: postItem) => {
  await postAPI().del(row.id)
  await getPostData()
}

const filterTableData = computed(() =>
  postData.value?.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  ) as [postItem]
)

const openCreateWindow = () => {
  // 清除数据
  form.create.title = ''
  visible.value.create = true
}

const openEditWindow = (index: number, row: postItem) => {
  console.log(index, row)
  // 填充数据
  if (postData.value) {
    form.edit.id = postData.value[index].id.toString()
    form.edit.title = postData.value[index].title
  }
  visible.value.edit = true
}

const createSubmit = async () => {
  await postAPI().add(form.create as postItem)
  await getPostData()
  visible.value.create = false
}

const updateSubmit = async () => {
  await postAPI().update(form.edit as unknown as postItem)
  await getPostData()
  visible.value.edit = false
}

</script>

<template>
  <!--新建按钮-->
  <el-button type="primary" style="margin-right: 16px" @click="openCreateWindow">新建岗位</el-button>

  <!--主体表格-->
  <el-table :data="filterTableData " height="250" style="width: 100%">
    <el-table-column prop="title" label="岗位" width="auto"/>
    <el-table-column prop="createTime" label="创建时间" width="auto"/>
    <el-table-column prop="updateTime" label="更新时间" width="auto"/>
    <el-table-column align="right">
      <!--搜索栏-->
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索"/>
      </template>
      <template #default="scope">
        <!--更新按钮-->
        <el-button size="small" @click="openEditWindow(scope.$index, scope.row)">编辑</el-button>
        <el-popconfirm title="确定要删除该岗位吗？" confirm-button-text="确定" cancel-button-text="取消"
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

  <!--新建岗位表单弹窗-->
  <el-dialog v-model="visible.create" title="新建岗位">
    <el-form :model="form.create" label-width="120px">
      <el-form-item label="岗位名称">
        <el-input v-model="form.create.title"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createSubmit">创建</el-button>
        <el-button @click="visible.create=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!--更新岗位表单弹窗-->
  <el-dialog v-model="visible.edit" title="更新岗位">
    <el-form :model="form.edit" label-width="120px">
      <el-form-item label="岗位名称">
        <el-input v-model="form.edit.title"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateSubmit">更新</el-button>
        <el-button @click="visible.edit=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<style scoped>

</style>
