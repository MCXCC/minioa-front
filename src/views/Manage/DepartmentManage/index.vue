<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue'
import { departmentAPI } from '@/apis/department'
import { departmentItem } from '@/types/default'

const departmentData = ref<[departmentItem]>()
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

const filterTableData = computed(() =>
  departmentData.value?.filter(
    (data) =>
      !search.value ||
      data.title.toLowerCase().includes(search.value.toLowerCase())
  ) as [departmentItem]
)

/**
 * 获得部门数据
 */
const getDepartmentData = async () => {
  const res = await departmentAPI().query()
  departmentData.value = res.data
  console.log(departmentData.value)
}

/**
 * 删除部门
 * @param index 序列号
 * @param row 数据
 */
const handleDelete = async (index: number, row: departmentItem) => {
  await departmentAPI().del(row.id)
  await getDepartmentData()
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
  const edit = (index: number, row: departmentItem) => {
    console.log(index, row)
    // 填充数据
    if (departmentData.value) {
      form.edit.id = row.id.toString()
      form.edit.title = row.title
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
    await departmentAPI().add(form.create as departmentItem)
    await getDepartmentData()
    visible.value.create = false
  }

  /**
   * 更新岗位
   */
  const update = async () => {
    await departmentAPI().update(form.edit as unknown as departmentItem)
    await getDepartmentData()
    visible.value.edit = false
  }

  return {
    create,
    update
  }
}

onMounted(() => {
  getDepartmentData()
})
</script>

<template>
  <!--主体表格-->
  <el-table :data="filterTableData " height="250" style="width: 100%">
    <el-table-column prop="title" label="部门" width="auto"/>
    <el-table-column prop="createTime" label="创建时间" width="auto"/>
    <el-table-column prop="updateTime" label="更新时间" width="auto"/>
    <el-table-column align="right">
      <!--表头右栏-->
      <template #header>
        <div style="display: flex">
          <!--搜索栏-->
          <el-input v-model="search" size="small" placeholder="搜索"/>
          <!--新建按钮-->
          <el-button type="primary" style="margin-left: 16px" @click="openDialog().create()">新建部门</el-button>
        </div>
      </template>

      <template #default="scope">
        <!--更新按钮-->
        <el-button size="small" @click="openDialog().edit(scope.$index, scope.row)">编辑</el-button>
        <el-popconfirm title="确定要删除该部门吗？" confirm-button-text="确定" cancel-button-text="取消"
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

  <!--新建部门表单弹窗-->
  <el-dialog v-model="visible.create" title="新建部门">
    <el-form :model="form.create" label-width="120px">
      <el-form-item label="部门名称">
        <el-input v-model="form.create.title"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit().create()">创建</el-button>
        <el-button @click="visible.create=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!--更新部门表单弹窗-->
  <el-dialog v-model="visible.edit" title="更新部门">
    <el-form :model="form.edit" label-width="120px">
      <el-form-item label="部门名称">
        <el-input v-model="form.edit.title"/>
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
