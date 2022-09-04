<!--
 * @ModuleName: TablePage
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-03 10:23:52
-->
<template>
  <div>
    <div style="padding:10px;margin-bottom:15px;background:#ffffff;">
      <el-alert type="info">
        相关模块正在迁移对接中，完整实例可查看系统管理 > 菜单管理模块，此模块目前仅供查看。
      </el-alert>
    </div>
    <el-card>
      <template #header> 表格基本使用(自适应) </template>
      <div style="height: 500px">
        <g-table ref="tableRef" v-model:page-size="search.page_size" v-model:page-number="search.page_number" page :total="search.total" :data="tableData" :columns="columns" @page-change="pageChange">
          <el-form inline>
            <el-form-item>
              <el-input />
            </el-form-item>
            <el-form-item>
              <el-select>
                <!-- <el-option v-for="" :key=""></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button>检索</el-button>
              <el-button type="primary" @click="toggleSelect">全选/取消</el-button>
            </el-form-item>
          </el-form>
          
          <template #name="{ row }"> {{ row.name }} </template>
        </g-table>
      </div>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header> 表格基本使用(拖拽表格) </template>
      <div style="height: 500px">
        <g-table v-model:page-size="search.page_size" v-model:page-number="search.page_number" drag page :total="search.total" :data="tableData" :columns="columns" @page-change="pageChange">
          <el-form inline>
            <el-form-item>
              <el-input clearable placeholder="用户名" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">检索</el-button>
            </el-form-item>
          </el-form>
          <template #name="{ row }"> {{ row.name }} </template>
        </g-table>
      </div>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header> 表格基本使用(表格插槽) </template>
      <div style="height: 500px">
        <g-table v-model:page-size="search.page_size" v-model:page-number="search.page_number" drag page :total="search.total" :data="tableData" :columns="columnsEdit" @page-change="pageChange">
          <el-form inline>
            <el-form-item>
              <el-input clearable placeholder="用户名" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">检索</el-button>
            </el-form-item>
          </el-form>
          <template #name="{ row }"> {{ row.name }} </template>
          <template #cz> 
            <g-link type="primary">编辑</g-link>
            <g-link type="danger">删除</g-link>
          </template>
        </g-table>
      </div>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header> 表格属性 </template>
      <a href="https://element-plus.gitee.io/zh-CN/component/table.html#table-attributes">参考Element-Plus官网属性</a>
      <br /><br />以下为二次封装提供属性：<br />
      <g-table style="height:400px" :columns="help.PropertyColumns" :data="table1Data"></g-table>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header> 表格方法 </template>
      <a href="https://element-plus.gitee.io/zh-CN/component/table.html#table-attributes">参考Element-Plus官网方法</a>
      <br /><br />以下为二次封装提供方法：<br />
      <g-table style="height:300px" :columns="help.FuncColumns" :data="table2Data"></g-table>
    </el-card>
    <el-card style="margin-top: 15px">
      <template #header> 表格插槽 </template>
      <a href="https://element-plus.gitee.io/zh-CN/component/table.html#table-slots">参考Element-Plus官网插槽</a>
      <br /><br />以下为二次封装提供插槽：<br />
      <g-table style="height:300px" :columns="help.SlotColumns" :data="table3Data"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import { mock } from "mockjs";
import { TableColumns, ElTable } from "@/types";
import { useSearchForm } from "@/hooks";
import help from "./index";

export default defineComponent({
  name: "tablePage",
  setup() {
    const tableRef = ref < InstanceType < typeof ElTable >>();
    const state = reactive({
      tableData: [],
      search: useSearchForm(),
      columns: [{
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
      ] as TableColumns[],
      columnsEdit: [{
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
      {
        label: "操作",
        width: "120px",
        fixed: "right",
        prop: "cz",
        slot: true,
      },
      ] as TableColumns[],
      searchInfo: {
        page_size: 10,
        page_number: 1,
        total: 0,
        keyWord: "",
      },
      help,
      table1Data: [{
        name: "columns",
        desc: "表格列集合",
        default: "[]",
        type: "Array<columns[]>",
        options: "",
      },
      {
        name: "loading",
        desc: "加载",
        default: "false",
        type: "boolean",
        options: "true",
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
      {
        name: "drag",
        desc: "拖拽模式,如需禁用某一行，可通过element-plus表格row-class-name动态添加class类名[drag_disabled]到指定行中即可",
        default: "false",
        type: "boolean",
        options: "true",
      },
      ],
      table2Data: [{
        name: "page-change",
        desc: "分页改变触发",
        type: "function",
        default: "",
      },
      {
        name: "drag-start",
        desc: "拖拽开始",
        type: "function",
        default: "",
      },
      {
        name: "drag-end",
        desc: "拖拽结束",
        type: "function",
        default: "",
      }],
      table3Data: [{
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
      // const { data } = await GetUserData(state.searchInfo);
      const data = mock({
        code: 200,
        "data|10": [{
          id: ["@integer(10,10000)"],
          name: "@name()",
          address: "@region()",
          email: "@email()",
          status: "@pick([{type:'danger',label:'异常'},{type:'success',label:'正常'},{type:'warning',label:'质疑'},{type:'info',label:'未知'}])",
        }],
        info: "操作成功",
        total: 10000,
      });
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