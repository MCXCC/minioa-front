<script setup lang="ts">
import { onMounted, ref, computed, reactive, openBlock } from 'vue'
import { userAPI } from '@/apis/user'
import { postAPI } from '@/apis/post'
import { departmentAPI } from '@/apis/department'
import { lineAPI } from '@/apis/line'
import { userItem, postItem, lineItem, departmentItem } from '@/types/default'

/**
 * 用户数据
 */
const userData = ref<[userItem]>()
/**
 * 岗位数据
 */
const postData = ref<[postItem]>()
/**
 * 线路数据
 */
const lineData = ref<[lineItem]>()
/**
 * 部门数据
 */
const departmentData = ref<[departmentItem]>()
const visible = ref({
  create: false,
  edit: false
})
const search = ref('')
const form = reactive({
  create: {
    workNumber: 'D',
    name: '',
    post: {},
    line: {},
    department: {}
  },
  edit: {
    id: '',
    workNumber: 'D',
    name: '',
    post: {},
    line: {},
    department: {}
  }
})

const filterTableData = computed(() =>
  userData.value?.filter(
    (data) => !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.workNumber.toLowerCase().includes(search.value.toLowerCase())
  ) as [userItem]
)

/**
 * 获得用户数据
 */
const getUserData = async () => {
  const res = await userAPI().query()
  userData.value = res.data
  console.log(userData.value)
}

/**
 * 获得岗位数据
 */
const getPostData = async () => {
  const res = await postAPI().query()
  postData.value = res.data
  console.log(postData.value)
}

/**
 * 获得线路数据
 */
const getLineData = async () => {
  const res = await lineAPI().query()
  lineData.value = res.data
  console.log(lineData.value)
}

/**
 * 获得部门数据
 */
const getDepartmentData = async () => {
  const res = await departmentAPI().query()
  departmentData.value = res.data
  console.log(departmentData.value)
}

/**
 * 删除员工
 * @param index 序列号
 * @param row 数据
 */
const handleDelete = async (index: number, row: postItem) => {
  await userAPI().del(row.id)
  await getUserData()
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
    form.create.name = ''
    form.create.department = ''
    form.create.line = ''
    form.create.post = ''
    form.create.workNumber = 'D'

    visible.value.create = true
    getPostData()
    getLineData()
    getDepartmentData()
  }

  /**
   * 更新表单
   * @param index 序列号
   * @param row 数据
   */
  const edit = (index: number, row: userItem) => {
    console.log(index, row)
    // 填充数据
    if (userData.value) {
      form.edit.id = row.id.toString()
      form.edit.workNumber = row.workNumber
      form.edit.name = row.name
      form.edit.department = row.department
      form.edit.line = row.line
      form.edit.post = row.post
    }
    getLineData()
    getPostData()
    getDepartmentData()
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
    await userAPI().add(form.create as unknown as userItem)
    await getUserData()
    visible.value.create = false
  }

  /**
   * 更新岗位
   */
  const update = async () => {
    await userAPI().update(form.edit as unknown as userItem)
    await getUserData()
    visible.value.edit = false
  }

  return {
    create,
    update
  }
}

onMounted(() => {
  getUserData()
})

</script>

<template>
  <!--主体表格-->
  <el-table :data="filterTableData " border height="250" style="width: 100%">
    <el-table-column fixed prop="workNumber" label="工号" width="80px" align="center"/>
    <el-table-column fixed prop="name" label="姓名" width="100px" align="center"/>
    <el-table-column prop="post.title" label="岗位" width="120px" align="center"/>
    <el-table-column prop="line.title" label="所属线路" width="100px" align="center"/>
    <el-table-column prop="department.title" label="部门" width="160px" align="center"/>
    <el-table-column prop="createTime" label="创建时间" width="200px" align="center"/>
    <el-table-column prop="updateTime" label="更新时间" width="200px" align="center"/>
    <el-table-column fixed="right" align="right" width="300px">
      <template #header>
        <div style="display: flex">
          <!--搜索栏-->
          <el-input v-model="search" size="small" placeholder="搜索"/>
          <!--新建按钮-->
          <el-button type="primary" style="margin-left: 16px" @click="openDialog().create()">新建员工</el-button>
        </div>
      </template>
      <template #default="scope">
        <!--更新按钮-->
        <el-button size="small" @click="openDialog().edit(scope.$index, scope.row)">编辑</el-button>
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

  <!--新建员工表单弹窗-->
  <el-dialog v-model="visible.create" title="新建员工">
    <el-form :model="form.create" label-width="120px">
      <el-form-item required label="工号">
        <el-input v-model="form.create.workNumber"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.create.name"/>
      </el-form-item>
      <el-form-item required label="岗位">
        <el-select v-model="form.create.post" value-key="id" placeholder="Select">
          <el-option
            v-for="item in postData"
            :key="item.id"
            :label="item.title"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item required label="所属线路">
        <el-select v-model="form.create.line" value-key="id" placeholder="Select">
          <el-option
            v-for="item in lineData"
            :key="item.id"
            :label="item.title"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item required label="部门">
        <el-select v-model="form.create.department" value-key="id" placeholder="Select">
          <el-option
            v-for="item in departmentData"
            :key="item.id"
            :label="item.title"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit().create()">创建</el-button>
        <el-button @click="visible.create=false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!--更新员工表单弹窗-->
  <el-dialog v-model="visible.edit" title="更新岗位">
    <el-form :model="form.edit" label-width="120px">
      <el-form-item required label="工号">
        <el-input disabled v-model="form.edit.workNumber"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.edit.name"/>
      </el-form-item>
      <el-form-item required label="岗位">
        <el-select v-model="form.edit.post" value-key="id" filterable clearable placeholder="Select">
          <el-option
            v-for="item in postData"
            :key="item.id"
            :label="item.title"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item required label="所属线路">
        <el-select v-model="form.edit.line" value-key="id" filterable clearable placeholder="Select">
          <el-option
            v-for="item in lineData"
            :key="item.id"
            :label="item.title"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item required label="部门">
        <el-select v-model="form.edit.department" value-key="id" filterable clearable placeholder="Select">
          <el-option
            v-for="item in departmentData"
            :key="item.id"
            :label="item.title"
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
