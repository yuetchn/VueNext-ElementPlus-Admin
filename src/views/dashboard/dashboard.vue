<!--
 * @ModuleName: Dashboard
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 17:36:55
-->
<template>
  <div>
    <div style="padding: 20px">
      仪表盘
      <el-button type="primary" @click="showDialog = true">测试弹窗</el-button>
      <el-button type="info">打印</el-button>
      <br />
      <el-link type="primary">Git</el-link>
    </div>

    <el-table :data="tableData" border>
      <el-table-column type="selection" width="50px" align="center"></el-table-column>
      <el-table-column label="ID" prop="id" width="60px" align="center"></el-table-column>
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

    <g-dialog v-model="showDialog" title="测试弹窗"> 你好呀 </g-dialog>
    <a href="https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin" style="position: absolute; right: 100px; top: 8px; z-index: 9999">
      <img alt="访问Git仓库地址" src="https://gitee.com/static/images/logo-black.svg?t=158106664" style="width: 100px" />
    </a>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { GetUserData } from "@/api/user";

export default defineComponent({
  setup() {
    const state = reactive({
      showDialog: false,
      tableData: [],
    });

    const getUserDt = async () => {
      const { data } = await GetUserData();
      if (data.code === 200) {
        console.log(data);
        state.tableData = data.data;
      }
    };

    onMounted(() => {
      getUserDt();
    });
    return {
      // refs
      ...toRefs(state),

      // func
    };
  },
});
</script>
