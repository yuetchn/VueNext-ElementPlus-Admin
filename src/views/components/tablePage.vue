<!--
 * @ModuleName: TablePage
 * @Author: 乐涛
 * @LastEditTime: 2022-01-27 09:48:24
-->
<template>
  <div>
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
    </el-table>
    <!-- <g-page v-model:page-size="searchInfo.pageSize" v-model:page-number="searchInfo.pageNumber" :total="searchInfo.total" @change="getUserDt"></g-page> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { GetUserData } from "@/api/user";

export default defineComponent({
  name: "tablePage",
  setup() {
    const state = reactive({
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
        state.searchInfo.total = data.total
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