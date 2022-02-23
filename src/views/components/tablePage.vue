<!--
 * @ModuleName: TablePage
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-14 10:36:14
-->
<template>
  <div class="app-container">
    <g-table ref="tableRef" v-model:page-size="search.pageSize" v-model:page-number="search.pageNumber" page :total="search.total" :data="tableData" :columns="columns" @page-change="pageChange">
      <div>
        <el-button type="primary" @click="toggleSelect">全选/取消</el-button>
      </div>
      <template #name="{ row }"> {{ row.name }} </template>
    </g-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { TableColumns, ElTable, SearchForm } from "@base";
import { GetUserData } from "@/api/user";

export default defineComponent({
  name: "tablePage",
  setup() {
    const tableRef = ref<InstanceType<typeof ElTable>>();
    const state = reactive({
      tableData: [],
      search: new SearchForm(),
      columns: <TableColumns[]>[
        {
          type: "selection",
          width: 50,
        },
        {
          label: "ID",
          prop: "id",
          width: "120px",
        },
        {
          label: "Name",
          prop: "name",
          slot: true,
        },
      ],
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

    const toggleSelect = () => {
      tableRef.value?.toggleAllSelection();
    };

    const pageChange = () => {
      console.log("改变");
    };
    return {
      // ref
      tableRef,

      // refs
      ...toRefs(state),

      // func
      getUserDt,
      toggleSelect,
      pageChange,
    };
  },
});
</script>
