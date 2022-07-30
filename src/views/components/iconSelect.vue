<!--
 * @ModuleName: IconSelect
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-25 15:12:46
-->
<template>
  <div>
    <el-card>
      <template #header>说明</template>
      <div>
        IconSelect提供icon选择，自动加载src/assets/icons目录下的所有icon。
      </div>
    </el-card>
    <el-card style="margin-top:15px">
      <template #header>示例</template>
      <el-input v-model.trim="iconSelect" class="icon-select-input" disabled clearable placeholder="图标">
        <template #prepend>
          <span>
            <g-svg-icon :name="iconSelect" />
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
              <div style="width:300px;height:300px;">
                <g-icon-select @change="iconChange" />
              </div>
            </template>
          </el-popover>
        </template>
      </el-input>
    </el-card>

    <el-card style="margin-top:15px;">
      <template #header>方法</template>
      <g-table style="height:300px" :columns="help.FuncColumns" :data="data"></g-table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import help from "./index";

const data = [
  {
    name: "change",
    desc: "切换选择",
    type: "function",
    default: "(name:string)=>{}",
  },
]
const iconSelect = ref<string>("")

const iconChange = (v: string) => {
  iconSelect.value = v
}
</script>
<style lang="scss" scoped>
.icon-select-input{
  ::v-deep(.el-input-group__append){
    background:$color-primary;
  }
}
</style>