<!--
 * @ModuleName: 角色管理
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-29 23:06:43
-->
<template>
  <div class="app-container">
    <g-table v-model:page-size="searchForm.page_size" v-model:page-number="searchForm.page_number" :total="searchForm.total" page :loading="tableDataLoading" :data="tableData" :columns="tableColumns" @page-change="getTableData()">
      <el-form inline label-suffix="：" @submit.prevent>
        <el-form-item>
          <el-input v-model.trim="searchForm.keyword" placeholder="角色名称" maxlength="50" clearable @clear="getTableData(true)" @keydown.enter="getTableData(true)" />
        </el-form-item>
        <el-form-item>
          <el-button @click="getTableData(true)">
            <g-svg-icon name="search" />
          </el-button>
          <el-button type="primary" @click="dialogVis=true">
            <g-svg-icon name="add"></g-svg-icon>
          </el-button>
        </el-form-item>
      </el-form>

      <template #status="{row}">
        <el-tag v-if="row.status">启用</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>

      <template #cz="{row}">
        <g-link type="primary" right="10" icon="edit" @click="editRole(row.id)">编辑</g-link>
        <g-link type="danger" icon="delete" @click="deleteRole(row.id)">删除</g-link>
      </template>
    </g-table>

    <!-- 新增/编辑 -->
    <g-dialog v-model="dialogVis" :title="roleForm.id?'编辑':'新增'" @close="dialogClose">
      <el-form ref="roleFormRef" v-loading="roleFormLoading" :model="roleForm" label-suffix="：" label-width="100px">
        <el-form-item label="角色名称" prop="role_name" required>
          <el-input v-model.trim="roleForm.role_name" maxlength="100" clearable placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="roleForm.status" active-text="启用" :active-value="1" :inactive-value="0" inactive-text="禁用"></el-switch>
        </el-form-item>
        <el-form-item label="描述" prop="remark">
          <el-input v-model.trim="roleForm.remark" maxlength="200" type="textarea" :rows="5" placeholder="描述..." />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVis=false">取消</el-button>
        <el-button type="primary" :loading="roleFormLoading" @click="roleFormSubmit">确认</el-button>
      </template>
    </g-dialog>
  </div>
</template>
<script lang="ts">
import { reactive, ref, onMounted } from "vue"
import { TableColumns, SearchForm, FormInstance, ElMessageBox } from "@base"
import { message } from "ant-design-vue"
import { GetRoleByPage, GetRoleByID, SaveOrUpdateRole, DeleteRoleByID } from "@/api/v1/system/role"

export default {
  name: "roleManage",
}
</script>
<script lang="ts" setup>
const tableColumns: TableColumns[] = [
  {
    label: "ID",
    prop: "id",
    width: "100px",
  },
  {
    label: "角色名称",
    prop: "role_name",
  },
  {
    label: "状态",
    prop: "status",
    slot: true,
    align: "center",
    width: "130px",
  },
  {
    label: "创建时间",
    prop: "create_time",
  },
  {
    label: "备注",
    prop: "remark",
  },
  {
    label: "操作",
    prop: "cz",
    width: "180px",
    fixed: "right",
    align: "center",
    slot: true,
  },
]
const dialogVis = ref(false)
const roleFormRef = ref<FormInstance>()
const roleFormLoading = ref(false)
const tableData = ref < any[] >([])
const tableDataLoading = ref(false)
const searchForm = reactive(new SearchForm())
const roleForm = reactive({
  role_name: "",
  id: 0,
  remark: "",
  status: 1,
})

onMounted(() => {
  getTableData()
})

// 获取表格数据
const getTableData = async (reset = false) => {
  if (reset) {
    searchForm.page_number = 1
  }
  try {
    tableDataLoading.value = true
    const { data } = await GetRoleByPage<{list:any[], total:number}>(searchForm)

    if (data.code === 200) {
      tableData.value = data.data.list
      searchForm.total = data.data.total
    }
  } finally {
    tableDataLoading.value = false
  }
}

const dialogClose = () => {
  roleFormRef.value?.resetFields()
  roleForm.id = 0
}

// 新增/编辑提交
const roleFormSubmit = () => {
  roleFormRef.value?.validate(async (v) => {
    if (!v) {
      return
    }
    try {
      roleFormLoading.value = true
      const { data } = await SaveOrUpdateRole(roleForm)
      if (data.code === 200) {
        message.success(data.msg)
      }
      dialogVis.value = false
      getTableData(true)
    } finally {
      roleFormLoading.value = false
    }
  })
}

// 行内编辑角色
const editRole = async (id:number) => {
  const { data } = await GetRoleByID(id)
  if (data.code === 200) {
    Object.assign(roleForm, data.data)
    dialogVis.value = true
  }
}

// 行内删除角色
const deleteRole = async (id:number) => {
  await ElMessageBox.confirm("确认删除此角色？", "警告", {
    type: "warning",
  })
  const { data } = await DeleteRoleByID(id)
  if (data.code === 200) {
    message.success(data.msg)
    getTableData(true)
  }
}
</script>