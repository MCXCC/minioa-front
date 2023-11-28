<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue'
import { postAPI } from '@/apis/post'
import { postItem } from '@/types/default'

const post = postAPI()
const visible = ref(false)
const search = ref('')
const postDate = ref<[postItem]>()
const getPostDate = async () => {
  const res = await post.query()
  postDate.value = res.data
  console.log(postDate.value)
}

onMounted(() => {
  getPostDate()
})

const handleEdit = (index: number, row: postItem) => {
  console.log(index, row)
}
const handleDelete = async (index: number, row: postItem) => {
  await post.del(row.id)
  await getPostDate()
}

const filterTableData = computed(() =>
  postDate.value?.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  )
)
const form = reactive({
  title: ''
})

const onSubmit = async () => {
  await post.add(form as postItem)
  await getPostDate()
  visible.value = false
}

</script>

<template>
  <el-popover :visible="visible" style="text-align: right;" placement="right" :width="400" trigger="click">
    <template #reference>
      <el-button type="primary" style="margin-right: 16px" @click="visible=true">新建岗位</el-button>
    </template>
    <el-form :model="form" label-width="120px">
      <el-form-item label="岗位名称">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="visible=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-popover>
  <el-table :data="filterTableData " height="250" style="width: 100%">
    <el-table-column prop="title" label="岗位" width="180"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索"/>
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-popconfirm title="确定要删除该岗位吗？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleDelete(scope.$index, scope.row)">
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
