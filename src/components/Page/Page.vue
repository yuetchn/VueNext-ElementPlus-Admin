<!--
 * @ModuleName: Page
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-23 13:49:37
-->
<template>
  <div class="g_page">
    <el-pagination 
      v-model:currentPage="currentPage"
      v-model:page-size="nowPageSize"
      :page-sizes="pageSizes"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue"

export default defineComponent({
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    background: {
      type: Boolean,
      default: true,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100, 200, 500, 1000],
    },
  },
  emits: ["change", "update:pageSize", "update:pageNumber"],
  setup(props, { emit }) {
    const state = reactive({
      currentPage: props.pageNumber,
      nowPageSize: props.pageSize,
    })

    watch(state, (val) => {
      emit("update:pageSize", val.nowPageSize)
      emit("update:pageNumber", val.currentPage)
      emit("change")
    })

    return {
      // refs
      ...toRefs(state),

      // func
    }
  },
})
</script>
<style lang="scss" scoped>
  .g_page {
    padding: 5px;
    text-align: right;
  }
</style>