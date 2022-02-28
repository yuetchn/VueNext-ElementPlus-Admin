<!--
 * @ModuleName: TablePage
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-02-28 15:17:54
-->
<template>
  <div>
    <el-card>
      <template #header> 表格基本使用(自适应) </template>
      <div style="height: 500px">
        <g-table ref="tableRef" v-model:page-size="search.pageSize" v-model:page-number="search.pageNumber" page :total="search.total" :data="tableData" :columns="columns" @page-change="pageChange">
          <div>
            <el-button type="primary" @click="toggleSelect">全选/取消</el-button>
          </div>
          <template #name="{ row }"> {{ row.name }} </template>
        </g-table>
      </div>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header> 表格属性 </template>
      <a href="https://element-plus.gitee.io/zh-CN/component/table.html#table-attributes">参考Element-Plus官网属性</a>
      <br /><br />以下为二次封装提供属性：<br />
      <g-table :columns="help.PropertyColumns" :data="table1Data"></g-table>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header> 表格方法 </template>
      <a href="https://element-plus.gitee.io/zh-CN/component/table.html#table-attributes">参考Element-Plus官网方法</a>
      <br /><br />以下为二次封装提供方法：<br />
      <g-table :columns="help.FuncColumns" :data="table2Data"></g-table>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header> 表格插槽 </template>
      <a href="https://element-plus.gitee.io/zh-CN/component/table.html#table-slots">参考Element-Plus官网插槽</a>
      <br /><br />以下为二次封装提供插槽：<br />
      <g-table :columns="help.SlotColumns" :data="table3Data"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { TableColumns, ElTable, SearchForm } from "@base";
import { GetUserData } from "@/api/user";
import help from "./index";

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
      help,
      table1Data: [
        {
          name: "columns",
          desc: "表格列集合",
          default: "[]",
          type: "Array<columns[]>",
          options: "",
        },
        {
          name: "page",
          desc: "是否显示分页",
          default: "false",
          type: "boolean",
          options: "true",
        },
        {
          name: "page-size",
          desc: "每页条数",
          default: "20",
          type: "number",
          options: "",
        },
        {
          name: "page-number",
          desc: "页码",
          default: "1",
          type: "number",
          options: "",
        },
        {
          name: "total",
          desc: "总条数",
          default: "0",
          type: "number",
          options: "",
        },
      ],
      table2Data: [
        {
          name: "page-change",
          desc: "分页改变触发",
          type: "function",
          default: "",
        },
      ],
      table3Data: [
        {
          name: "default",
          desc: "头部插槽,一般用于表格头部表单",
        },
        {
          name: "footer",
          desc: "底部插槽",
        },
      ],
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
