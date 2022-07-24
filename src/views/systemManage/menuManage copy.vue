<!--
 * @ModuleName: 菜单管理
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-22 16:53:50
-->
<template>
  <div class="app-container">
    <g-table :loading="tableDataLoading" row-key="id" :data="tableData" :columns="columns" @selection-change="tableSelectionChange">
      <el-form>
        <el-form-item>
          <el-button type="primary" @click="dialogVis = true,addType='root'">新增</el-button>
          <el-button :loading="deleteSelectMenusLoading" :disabled="!tableSelectList.length" type="danger" @click="deleteSelectMenus">删除</el-button>
        </el-form-item>
      </el-form>

      <template #status="{row}">
        <el-tag v-if="row.status">启用</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>

      <template #cz="{row}">
        <g-link icon="edit" right="10" type="primary" @click="menuEdit(row)">编辑</g-link>
        <g-link icon="add" right="10" type="primary" @click="addChildrenMenu(row)">新增子菜单</g-link>
        <g-link icon="delete" type="danger" @click="menuDelete(row)">删除</g-link>
      </template>
    </g-table>

    <!-- 新增/编辑 -->
    <g-dialog v-model="dialogVis" :title="menuForm.id?'编辑':'新增'" @close="menuFormDialogClose" @open="menuFormDialogOpen">
      <el-form ref="menuFormRef" v-loading="menuFormLoading" :model="menuForm" label-suffix="：" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item required label="菜单名称" prop="name">
              <el-input v-model.trim="menuForm.name" placeholder="菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="菜单标题" prop="title">
              <el-input v-model.trim="menuForm.title" placeholder="菜单标题" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="父级菜单" prop="parent_id">
              <el-cascader ref="menuCascaderRef" v-model="menuForm.parent_id" clearable :show-all-levels="false" :props="{label:'title',value:'id',children:'children',checkStrictly: true,}" :options="selectTreeData" placeholder="父级菜单" style="width:100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标" prop="icon">
              <el-input v-model.trim="menuForm.icon" placeholder="图标" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item required label="路由地址" prop="path">
              <el-input v-model.trim="menuForm.path" placeholder="路由地址" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item required label="模块地址" prop="component">
              <el-input v-model.trim="menuForm.component" placeholder="模块地址" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item required label="状态" prop="status">
              <el-select v-model="menuForm.status" placeholder="状态">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input-number v-model="menuForm.sort" placeholder="排序" :min="0" :max="999999" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <el-button :disabled="menuFormLoading" @click="dialogVis=false">取消</el-button>
        <el-button :loading="menuFormLoading" type="primary" @click="menuFormSubmit">保存</el-button>
      </template>
    </g-dialog>
  </div>
</template>
<script lang="ts">
import { TableColumns, FormInstance, ElCascader } from "@base"
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue"
import { message } from "ant-design-vue"
import { ElMessageBox } from "element-plus"
import { GetAllMenuTree, SaveOrUpdate, GetMenuByID, DeleteMenuByID, DeleteMenuByIDS } from "@/api/v1/system/menu"
import { GetCascaderParent } from "@/utils/func"

export default defineComponent({
  setup() {
    const menuFormRef = ref < FormInstance >()
    const menuCascaderRef = ref<InstanceType<typeof ElCascader>>()
    const state = reactive({
      columns: < TableColumns[] > [{
        label: "selection",
        type: "selection",
        width: "60px",
        align: "center",
      },
      {
        label: "编号",
        prop: "id",
        width: "160px",
      },
      {
        label: "名称",
        prop: "name",
        width: "220px",
      },
      {
        label: "标题",
        prop: "title",
        width: "220px",
      },
      {
        label: "路由地址",
        prop: "path",
      },
      {
        label: "模块地址",
        prop: "component",
      },
      {
        label: "状态",
        prop: "status",
        width: "110px",
        align: "center",
        slot: true,
      },
      {
        label: "操作",
        prop: "cz",
        align: "center",
        slot: true,
        fixed: "right",
        width: "250px",
      },
      ],
      tableData: <any[]>[],
      tableDataLoading: false,
      tableSelectList: <any[]>[],
      deleteSelectMenusLoading: false,
      selectTreeData: <any[]>[],
      dialogVis: false,
      addType: "root",
      menuForm: {
        id: 0,
        parent_id: <any> [],
        title: null,
        name: null,
        path: null,
        component: null,
        icon: null,
        status: 1,
        sort: 0,
      },
      menuFormLoading: false,
      selectMenu: <any>{},
    })

    onMounted(() => {
      init()
    })

    const init = async () => {
      try {
        state.tableDataLoading = true
        const { data } = await GetAllMenuTree()
        if (data.code === 200) {
          state.tableData = data.data
        }
      } finally {
        state.tableDataLoading = false
      }
    }

    const addChildrenMenu = (row:any) => {
      state.selectMenu = { ...row }
      state.addType = "children"
      state.dialogVis = true
    }

    const menuFormSubmit = () => {
      menuFormRef.value?.validate(async (v) => {
        if (!v) {
          return
        }
        try {
          const parentIds = menuCascaderRef.value?.getCheckedNodes(false)
          state.menuFormLoading = true
          state.menuForm.parent_id = parentIds?.length ? (parentIds[0] as any).value : 0
          
          const { data } = await SaveOrUpdate(state.menuForm)
          if (data.code === 200) {
            message.success(data.msg)
            state.dialogVis = false
          }
        } finally {
          state.menuFormLoading = false
        }
      })
    }

    const menuFormDialogClose = () => {
      menuFormRef.value?.resetFields()
      state.menuForm.id = 0
      init()
    }

    const menuFormDialogOpen = async () => {
      await getAllMenuTree()
      if (state.menuForm.id !== 0) {
        const parent = GetCascaderParent(state.selectTreeData, state.menuForm.id, { id: "id", parentId: "parent_id", children: "children" })
        state.menuForm.parent_id = parent.slice(0, parent.length - 1)
      } else if (state.addType === "children") {
        state.menuForm.parent_id = GetCascaderParent(state.selectTreeData, state.selectMenu.id, { id: "id", parentId: "parent_id", children: "children" })
      } else {
        state.menuForm.parent_id = []
      }
    }

    const getAllMenuTree = async () => {
      const { data } = await GetAllMenuTree()
      if (data.code === 200) {
        state.selectTreeData = data.data
      }
    }

    const menuEdit = async (row:any) => {
      const { data } = await GetMenuByID(row.id)
      if (data.code === 200) {
        state.menuForm = data.data
        state.dialogVis = true
      }
    }

    const menuDelete = async (row:any) => {
      await ElMessageBox.confirm("确认删除此菜单？", "警告", {
        type: "warning",
      })
 
      const { data } = await DeleteMenuByID(row.id)
      if (data.code === 200) {
        message.success(data.msg)
        init()
      }
    }

    const deleteSelectMenus = async () => {
      await ElMessageBox.confirm("确认删除所选菜单？", "警告", {
        type: "warning",
      })
      try {
        state.deleteSelectMenusLoading = true
        const { data } = await DeleteMenuByIDS(state.tableSelectList.map(m => m.id))
        if (data.code === 200) {
          state.tableSelectList = []
          init()
        }
      } finally {
        state.deleteSelectMenusLoading = false
      }
    }

    const tableSelectionChange = (rows: any[]) => {
      state.tableSelectList = rows
    }

    return {
      // ref
      ...toRefs(state),
      menuFormRef,
      menuCascaderRef,

      // func
      menuFormSubmit,
      menuFormDialogClose,
      menuFormDialogOpen,
      getAllMenuTree,
      menuEdit,
      menuDelete,
      addChildrenMenu,
      tableSelectionChange,
      deleteSelectMenus,
    }
  },
})
</script>