<!--
 * @ModuleName: 菜单管理
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-03 10:23:08
-->
<template>
  <div class="container">
    <div class="tree">
      <div class="tree-nav">
        <div class="title">菜单管理</div>
        <div>
          <g-link v-per="'add'" :disabled="menuTreeDataLoading" type="primary" icon="add" @click="addMenu">新增</g-link>
        </div>
      </div>
      <el-scrollbar class="tree-content">
        <el-tree v-loading="menuTreeDataLoading" :expand-on-click-node="false" default-expand-all :data="menuTreeData" :props="{ label: 'title' }" node-key="id" highlight-current>
          <template #default="{ node, data }">
            <span class="u_tree_template_content">
              <span class="u_tree_template_title" @click="editMenu(data)">{{ node.label }}</span>
              <span class="u_tree_template_btns">
                <g-link v-per="'addChildren'" icon="add" right="10" type="primary" @click="addChildrenMenu(data)">子菜单</g-link>
                <g-link v-per="'delete'" icon="delete" type="warning" @click="deleteMenu(data)">删除</g-link>
              </span>
            </span>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
    <div v-show="formType" class="detail">
      <div class="menu-form">
        <div class="menu-form-nav">
          <div class="title">{{ formType === "edit" ? "菜单详情" : "新增菜单" }}</div>
          <div class="btns">
            <g-link v-per="'save'" :disabled="menuFormLoading" type="primary" icon="save" @click="submitMenu">保存</g-link>
          </div>
        </div>
        <el-form ref="menuFormRef" v-loading="menuFormLoading" :model="menuForm" label-suffix="：" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item required label="菜单名称" prop="name">
                <el-input v-model.trim="menuForm.name" clearable maxlength="100" placeholder="菜单名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item required label="菜单标题" prop="title">
                <el-input v-model.trim="menuForm.title" clearable maxlength="100" placeholder="菜单标题" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="父级菜单" prop="parent_id">
                <el-cascader ref="menuCascaderRef" v-model="menuForm.parent_id" clearable :show-all-levels="false" :props="{ label: 'title', value: 'id', children: 'children', checkStrictly: true }" :options="selectTreeData" placeholder="父级菜单" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图标" prop="icon">
                <el-input v-model.trim="menuForm.icon" class="icon-select-input" disabled clearable placeholder="图标">
                  <template #prepend>
                    <span>
                      <g-svg-icon :name="menuForm.icon" />
                    </span>
                  </template>
                  <template #append>
                    <el-popover :width="300" placement="left" trigger="click">
                      <template #reference>
                        <el-button>
                          <g-svg-icon name="system" color="#ffffff" />
                        </el-button>
                      </template>
                      <template #default>
                        <div style="width: 300px; height: 300px">
                          <g-icon-select @change="menuFormIconChange" />
                        </div>
                      </template>
                    </el-popover>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item required label="路由地址" prop="path">
                <el-input v-model.trim="menuForm.path" clearable placeholder="路由地址" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item required label="模块地址" prop="component">
                <el-input v-model.trim="menuForm.component" clearable placeholder="模块地址" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item required label="状态" prop="status">
                <el-switch v-model="menuForm.status" active-text="启用" :active-value="1" :inactive-value="0" inactive-text="禁用"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序" prop="sort">
                <el-input-number v-model="menuForm.sort" placeholder="排序" :min="0" :max="999999" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="是否隐藏" prop="is_hide">
                <el-switch v-model="menuForm.is_hide" active-text="隐藏" :active-value="1" :inactive-value="0" inactive-text="显示"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="formType === 'edit'" class="menu-form-table">
        <div class="menu-form-nav">
          <div class="title">菜单按钮</div>
          <div class="btns">
            <g-link v-per="'addBtn'" type="primary" right="10" icon="add" @click="btnDialogVis = true">新增按钮</g-link>
          </div>
        </div>

        <div style="flex: 1">
          <g-table :loading="btnTableLoading" :data="btnTableData" :columns="btnColumns">
            <template #cz="{ row }">
              <g-link v-per="'deleteBtn'" icon="delete" type="warning" @click="deleteMenuBtn(row)">删除</g-link>
            </template>
          </g-table>
        </div>
      </div>
    </div>

    <!-- 新增按钮 -->
    <menuBtnUpdate :id="selectMenu.id" v-model:visible="btnDialogVis" @success="getMenuBtnsByPage()" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue";
import { message } from "ant-design-vue";
import { ElMessageBox } from "element-plus";
import { TableColumns, FormInstance, ElCascader } from "@/types";
import { GetAllMenuTree, SaveOrUpdate, GetMenuByID, DeleteMenuByID, GetMenuBtnByPage, DeleteBtnByID } from "@/api/v1/system/menu";
import { GetCascaderParent } from "@/utils/func";
import menuBtnUpdate from "./components/menuBtnUpdate.vue";
import { useSearchForm } from "@/hooks";

export default defineComponent({
  components: { menuBtnUpdate },
  setup() {
    const menuFormRef = ref<FormInstance>();
    const menuCascaderRef = ref<InstanceType<typeof ElCascader>>();
    const state = reactive({
      btnDialogVis: false,
      btnColumns: [
        {
          label: "名称",
          prop: "name",
        },
        {
          label: "唯一标识",
          prop: "key",
        },
        {
          label: "创建时间",
          prop: "create_time",
        },
        {
          label: "操作",
          prop: "cz",
          width: "150px",
          align: "center",
          slot: true,
        },
      ] as TableColumns[],
      btnTableData: [] as any[],
      btnSearchForm: useSearchForm({ menu_id: 0 }, 999999),
      btnTableLoading: false,
      menuTreeData: [] as any[],
      menuTreeDataLoading: false,
      deleteSelectMenusLoading: false,
      selectTreeData: [] as any[],
      dialogVis: false,
      addType: "root",
      formType: "",
      menuForm: {
        id: 0,
        parent_id: [] as number[],
        title: null,
        name: null,
        path: null,
        component: "",
        icon: "",
        status: 1,
        sort: 0,
        is_hide: 0,
      },
      menuFormLoading: false,
      selectMenu: {} as any,
    });

    onMounted(() => {
      init();
    });

    const init = async () => {
      try {
        state.menuTreeDataLoading = true;
        const { data } = await GetAllMenuTree();
        if (data.code === 200) {
          state.menuTreeData = data.data;
        }
      } finally {
        state.menuTreeDataLoading = false;
      }
    };

    const addMenu = async () => {
      await formReset();
      state.formType = "add";
      await formShow();
      state.menuForm.component = "Layout";
    };

    const editMenu = async (row: any) => {
      state.selectMenu = { ...row };
      const all = await Promise.all([getMenuBtnsByPage(), GetMenuByID(row.id)]);
      // getMenuBtnsByPage()
      const { data } = all[1];
      if (data.code === 200) {
        state.menuForm = data.data;
        state.formType = "edit";
        await formShow();
      }
    };

    const addChildrenMenu = async (row: any) => {
      await formReset();
      state.selectMenu = { ...row };
      state.addType = "children";
      state.formType = "add";
      await formShow();
    };

    const deleteMenu = async (row: any) => {
      await ElMessageBox.confirm("确认删除此菜单？", "警告", {
        type: "warning",
      });

      const { data } = await DeleteMenuByID(row.id);
      if (data.code === 200) {
        message.success(data.msg);
        init();
        if (state.selectMenu.id === row.id) {
          state.formType = "";
          formReset();
        }
      }
    };

    const deleteMenuBtn = async (row: any) => {
      await ElMessageBox.confirm("确认删除此按钮？", "警告", {
        type: "warning",
      });

      const { data } = await DeleteBtnByID(row.id);
      if (data.code === 200) {
        message.success(data.msg);
        getMenuBtnsByPage();
      }
    };

    const submitMenu = async () => {
      menuFormRef.value?.validate(async (v) => {
        if (!v) {
          return;
        }
        try {
          const parentIds = menuCascaderRef.value?.getCheckedNodes(false);
          state.menuFormLoading = true;
          state.menuForm.parent_id = parentIds?.length ? (parentIds[0] as any).value : 0;

          const { data } = await SaveOrUpdate(state.menuForm);
          if (data.code === 200) {
            message.success(data.msg);
            init();
            if (state.formType === "add") {
              formReset();
            }
          }
        } finally {
          state.menuFormLoading = false;
        }
      });
    };

    const formShow = async () => {
      await getAllMenuTree();
      if (state.menuForm.id !== 0) {
        const parent = GetCascaderParent(state.selectTreeData, state.menuForm.id, { id: "id", parentId: "parent_id", children: "children" });
        state.menuForm.parent_id = parent.slice(0, parent.length - 1);
      } else if (state.addType === "children") {
        state.menuForm.parent_id = GetCascaderParent(state.selectTreeData, state.selectMenu.id, { id: "id", parentId: "parent_id", children: "children" });
      } else {
        state.menuForm.parent_id = [];
      }
    };

    const formReset = async () => {
      menuFormRef.value?.resetFields();
      state.menuForm.id = 0;
      state.selectMenu = {};
    };

    const getAllMenuTree = async () => {
      const { data } = await GetAllMenuTree();
      if (data.code === 200) {
        state.selectTreeData = data.data;
      }
    };

    const getMenuBtnsByPage = async () => {
      try {
        state.btnTableLoading = true;
        state.btnSearchForm.query.menu_id = state.selectMenu.id;
        const { data } = await GetMenuBtnByPage(state.btnSearchForm.FormatQuery());
        if (data.code === 200) {
          state.btnTableData = data.data.list;
          state.btnSearchForm.total = data.data.total;
        }
      } finally {
        state.btnTableLoading = false;
      }
    };

    const menuFormIconChange = (name: string) => {
      state.menuForm.icon = name;
    };
    return {
      // ref
      ...toRefs(state),
      menuFormRef,
      menuCascaderRef,

      // func
      addMenu,
      submitMenu,
      editMenu,
      addChildrenMenu,
      deleteMenu,
      getMenuBtnsByPage,
      menuFormIconChange,
      deleteMenuBtn,
    };
  },
});
</script>
<style lang="scss" scoped>
.u_tree_template_content {
  flex: 1;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;

  &:hover {
    .u_tree_template_btns {
      display: inline;
    }
  }
}

.u_tree_template_title {
  flex: 1;
}

.u_tree_template_btns {
  flex: 0 0 auto;
  display: none;
}

.container {
  display: flex;
  height: 100%;
}

.tree {
  background: #ffffff;
  padding: 15px;
  flex: 0 0 auto;
  width: 380px;
  margin-right: 15px;
  position: relative;
  display: flex;
  flex-direction: column;

  .tree-nav {
    flex: 0 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .title {
      font-size: 16px;
      font-weight: 400;
    }
  }

  .tree-content {
    flex: 1;
    overflow: auto;
  }
}

.detail {
  flex: 1;
  padding: 15px;
  background: #ffffff;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.menu-form {
  .menu-form-nav {
    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid $border-base-color;
    padding-bottom: 10px;
    margin-bottom: 10px;

    .title {
      font-weight: 400;
      font-size: 16px;
    }

    .btns {
      display: flex;
    }
  }
}

.menu-form-table {
  @extend .menu-form;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.icon-select-input {
  ::v-deep(.el-input-group__append) {
    background: $color-primary;
  }
}
</style>
