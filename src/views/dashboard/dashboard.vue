<!--
 * @ModuleName: Dashboard
 * @Author: 乐涛
 * @LastEditTime: 2022-01-27 09:49:40
-->
<template>
  <div>
    <div style="padding: 10px 10px 0 10px">
      <el-form inline>
        <el-form-item label="关键字">
          <el-input v-model="searchInfo.keyWord" placeholder="关键字检索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">检索</el-button>
          <el-button type="primary" @click="showDialog = true">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" border>
      <el-table-column type="selection" width="50px" align="center"></el-table-column>
      <el-table-column label="ID" prop="id" width="80px" align="center"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Address" prop="address"></el-table-column>
      <el-table-column label="Email" prop="email"></el-table-column>
      <el-table-column label="状态" align="center" width="100px" prop="status">
        <template #default="{ row }">
          <el-tag :type="row.status.type">{{ row.status.label }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150px" align="center">
        <template #default>
          <el-link type="primary" style="margin-right: 10px">编辑</el-link>
          <el-link type="danger">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <g-page v-model:page-size="searchInfo.pageSize" v-model:page-number="searchInfo.pageNumber" :total="searchInfo.total" @change="getUserDt"></g-page>

    <g-dialog v-model="showDialog" title="新增">
      <el-form label-width="80px">
        <el-form-item label="Name">
          <el-input placeholder="Name"></el-input>
        </el-form-item>
        <el-form-item label="Address">
          <el-input placeholder="Address"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input placeholder="Email"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="showDialog = false">确定</el-button>
      </template>
    </g-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { GetUserData } from "@/api/user";

export default defineComponent({
  name: "dashboardIndex",
  setup() {
    const state = reactive({
      showDialog: false,
      tableData: [],
      searchInfo: {
        pageSize: 10,
        pageNumber: 1,
        total: 0,
        keyWord: "",
      },
    });

    const getUserDt = async () => {
      const { data } = await GetUserData(state.searchInfo);
      if (data.code === 200) {
        state.tableData = data.data;
        state.searchInfo.total = data.total;
      }
    };

    onMounted(() => {
      getUserDt();
    });
    return {
      // refs
      ...toRefs(state),

      // func
      getUserDt,
    };
  },
});
</script>
