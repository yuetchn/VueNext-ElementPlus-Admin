<!--
 * @ModuleName: 角色管理
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-17 14:09:49
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
          <el-button v-per="'add'" type="primary" @click="dialogVis = true">
            <g-svg-icon name="add"></g-svg-icon>
          </el-button>
        </el-form-item>
      </el-form>

      <template #status="{ row }">
        <el-tag v-if="row.status">启用</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>

      <template #cz="{ row }">
        <g-link v-per="'permission'" type="primary" right="10" icon="authorize" @click="rolePermission(row)">配置权限</g-link>
        <g-link v-per="'edit'" type="primary" right="10" icon="edit" @click="editRole(row.id)">编辑</g-link>
        <g-link v-per="'delete'" type="danger" icon="delete" @click="deleteRole(row.id)">删除</g-link>
      </template>
    </g-table>

    <!-- 新增/编辑/查看 -->
    <g-dialog v-model="dialogVis" :title="roleForm.id ? '编辑' : '新增'" @close="dialogClose">
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
        <el-button @click="dialogVis = false">取消</el-button>
        <el-button type="primary" :loading="roleFormLoading" @click="roleFormSubmit">确认</el-button>
      </template>
    </g-dialog>

    <!-- 授权 -->
    <g-dialog v-model="rolePermissionDialogVis" width="500px" title="权限配置" @close="permissionDialogClose()">
      <div v-loading="rolePermissionLoading">
        <div class="role_permission_nav">
          <el-checkbox v-model="rolePermissionCheckAll" @change="rolePermissionTreeSelectAll()">全选</el-checkbox>
        </div>
        <div class="role_permission_tree">
          <el-scrollbar>
            <el-tree ref="rolePermissionTreeRef" node-key="id" :data="menuTreeData" :props="{ label: 'title' }" show-checkbox />
          </el-scrollbar>
        </div>
      </div>
      <template #footer>
        <el-button @click="rolePermissionDialogVis = false">取消</el-button>
        <el-button type="primary" :loading="rolePermissionLoading" @click="rolePermissionSubmit()">确认</el-button>
      </template>
    </g-dialog>
  </div>
</template>
<script lang="ts">
import { reactive, ref, onMounted } from "vue";
import { TableColumns, SearchForm, FormInstance, ElMessageBox, ElTree } from "@base";
import { message } from "ant-design-vue";
import { GetRoleByPage, GetRoleByID, SaveOrUpdateRole, DeleteRoleByID } from "@/api/v1/system/role";
import { GetAllMenuTree } from "@/api/v1/system/menu";

export default {
  name: "roleManage",
};
</script>
<script lang="ts" setup>
const roleFormRef = ref < FormInstance >();
const rolePermissionTreeRef = ref < InstanceType < typeof ElTree >>();
// const formType = ref<"edit"|"add"|"view">("add")
const dialogVis = ref(false);
const roleFormLoading = ref(false);
const tableDataLoading = ref(false);
const rolePermissionLoading = ref(false);
const rolePermissionCheckAll = ref(false);
const rolePermissionDialogVis = ref(false);
const tableColumns: TableColumns[] = [{
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
  width: "250px",
  fixed: "right",
  align: "center",
  slot: true,
},
];
const tableData = ref < any[] >([]);
const menuTreeData = ref < any[] >([]);
const searchForm = reactive(new SearchForm());
const roleForm = reactive({
  role_name: "",
  id: 0,
  remark: "",
  status: 1,
  menu_ids: < any[] > [],
  btn_ids: < any[] > [],
});

onMounted(() => {
  getTableData();
});

// 获取表格数据
const getTableData = async (reset = false) => {
  if (reset) {
    searchForm.ResetPage()
  }
  try {
    tableDataLoading.value = true;
    const { data } = await GetRoleByPage(searchForm);

    if (data.code === 200) {
      tableData.value = data.data.list;
      searchForm.total = data.data.total;
    }
  } finally {
    tableDataLoading.value = false;
  }
};

const dialogClose = () => {
  roleFormRef.value?.resetFields();
  roleForm.id = 0;
};

const permissionDialogClose = () => {
  rolePermissionCheckAll.value = false
}

// 角色新增/编辑提交
const roleFormSubmit = () => {
  roleFormRef.value?.validate(async (v) => {
    if (!v) {
      return;
    }
    try {
      roleFormLoading.value = true;
      const { data } = await SaveOrUpdateRole(roleForm);
      if (data.code === 200) {
        message.success(data.msg);
      }
      dialogVis.value = false;
      getTableData(true);
    } finally {
      roleFormLoading.value = false;
    }
  });
};

// 行内编辑角色
const editRole = async (id: number) => {
  const { data } = await GetRoleByID(id);
  if (data.code === 200) {
    Object.assign(roleForm, data.data);
    dialogVis.value = true;
  }
};

// 行内删除角色
const deleteRole = async (id: number) => {
  await ElMessageBox.confirm("确认删除此角色？", "警告", {
    type: "warning",
  });
  const { data } = await DeleteRoleByID(id);
  if (data.code === 200) {
    message.success(data.msg);
    getTableData(true);
  }
};

// 行内配置权限
const rolePermission = async (row: any) => {
  try {
    rolePermissionDialogVis.value = true;
    rolePermissionLoading.value = true;
    const res = await Promise.all([GetAllMenuTree(), GetRoleByID(row.id)]);
    const data1 = res[0].data;
    const data2 = res[1].data;
    if (data1.code === 200 && data2.code === 200) {
      menuTreeData.value = data1.data;
      Object.assign(roleForm, data2.data);
      rolePermissionTreeRef.value?.setCheckedKeys(roleForm.menu_ids);
    } else {
      return new Error("获取详情失败");
    }
  } catch (err: any) {
    message.error(err);
  } finally {
    rolePermissionLoading.value = false;
  }
};

// 权限配置全选
const rolePermissionTreeSelectAll = () => {
  if (rolePermissionCheckAll.value) {
    rolePermissionTreeRef.value?.setCheckedNodes(menuTreeData.value);
    return;
  }
  rolePermissionTreeRef.value?.setCheckedNodes([]);
};

// 权限配置提交
const rolePermissionSubmit = async () => {
  try {
    rolePermissionLoading.value = true;
    const form = Object.assign(roleForm, { menu_ids: rolePermissionTreeRef.value?.getCheckedKeys() });
    const { data } = await SaveOrUpdateRole(form);
    if (data.code === 200) {
      message.success(data.msg);
      rolePermissionDialogVis.value = false;
    } else {
      return new Error(data.msg);
    }
  } catch (error: any) {
    message.error(error);
  } finally {
    rolePermissionLoading.value = false;
  }
};
</script>
<style lang="scss" scoped>
  .role_permission_nav {
    text-align: right;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid $border-base-color;
  }

  .role_permission_tree {
    height: 450px;
  }
</style>