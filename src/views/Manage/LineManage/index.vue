<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue'
import { lineAPI } from '@/apis/line'
import { lineItem, userItem } from '@/types/default'
import { userAPI } from '@/apis/user'

const lineData = ref<[lineItem]>()
const userData = ref<[userItem]>()
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
    title: '',
    director: {}
  }
})

const filterTableData = computed(() =>
  lineData.value?.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  )
)

/**
 * 获得线路数据
 */
const getLineData = async () => {
  const res = await lineAPI().query()
  lineData.value = res.data
  console.log(lineData.value)
}

/**
 * 获得用户数据
 */
const getUserData = async () => {
  const res = await userAPI().query()
  userData.value = res.data
  console.log(userData.value)
}

/**
 * 删除岗位
 * @param index 序列号
 * @param row 数据
 */
const handleDelete = async (index: number, row: lineItem) => {
  await lineAPI().del(row.id)
  await getLineData()
}

/**
 * 打开弹窗
 */
const openDialog = () => {
  /**
   * 创建表单
   */
  const create = () => {
    // 清除数据
    form.create.title = ''
    visible.value.create = true
  }

  /**
   * 更新表单
   * @param index 序列号
   * @param row 数据
   */
  const edit = (index: number, row: lineItem) => {
    console.log(index, row)
    // 获得人员数据
    getUserData()
    // 填充数据
    if (lineData.value) {
      form.edit.id = row.id.toString()
      form.edit.title = row.title
      form.edit.director = row.director ? row.director : ''
    }
    visible.value.edit = true
  }

  return {
    create,
    edit
  }
}

/**
 * 提交表单
 */
const onSubmit = () => {
  /**
   * 创建岗位
   */
  const create = async () => {
    await lineAPI().add(form.create as lineItem)
    await getLineData()
    visible.value.create = false
  }

  /**
   * 更新岗位
   */
  const update = async () => {
    await lineAPI().update(form.edit as unknown as lineItem)
    await getLineData()
    visible.value.edit = false
  }

  return {
    create,
    update
  }
}

onMounted(() => {
  getLineData()
})
</script>

<template>
  <!--主体表格-->
  <el-table :data="filterTableData " style="width: 100%">
    <el-table-column prop="title" label="线路" width="auto"/>
    <el-table-column prop="director.name" label="分管主任" width="auto"/>
    <el-table-column prop="createTime" label="创建时间" width="auto"/>
    <el-table-column prop="updateTime" label="更新时间" width="auto"/>
    <el-table-column align="right">
      <!--表头右栏-->
      <template #header>
        <div style="display: flex">
          <!--搜索栏-->
          <el-input v-model="search" size="small" placeholder="搜索"/>
          <!--新建按钮-->
          <el-button type="primary" style="margin-left: 16px" @click="openDialog().create()">新建线路</el-button>
        </div>
      </template>
      <template #default="scope">
        <!--更新按钮-->
        <el-button size="small" @click="openDialog().edit(scope.$index, scope.row)">编辑</el-button>
        <el-popconfirm title="确定要删除该线路吗？" confirm-button-text="确定" cancel-button-text="取消"
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

  <!--新建线路表单弹窗-->
  <el-dialog v-model="visible.create" title="新建线路">
    <el-form :model="form.create" label-width="120px">
      <el-form-item label="线路名称">
        <el-input v-model="form.create.title"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit().create()">创建</el-button>
        <el-button @click="visible.create=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!--更新线路表单弹窗-->
  <el-dialog v-model="visible.edit" title="更新线路">
    <el-form :model="form.edit" label-width="120px">
      <el-form-item label="线路名称">
        <el-input v-model="form.edit.title"/>
      </el-form-item>
      <el-form-item label="分管主任">
        <el-select v-model="form.edit.director" value-key="id" filterable clearable placeholder="Select">
          <el-option
            v-for="item in userData"
            :key="item.id"
            :label="'【'+item.workNumber +'】\t'+ item.name"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit().update()">更新</el-button>
        <el-button @click="visible.edit=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>
