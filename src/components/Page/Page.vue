<!--
 * @ModuleName: Page
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-17 14:01:37
-->
<template>
  <div class="g_page" :style="{justifyContent:pageAlign}">
    <el-pagination 
      v-model:currentPage="currentPage"
      v-model:page-size="nowPageSize"
      :page-sizes="pageSizes"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, PropType, reactive, toRefs } from "vue"

export default defineComponent({
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    /** 分页位置，默认：'left' */
    pageAlign: {
      type: String as PropType < "left" | "center" | "right" >,
      default: "left",
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
      type: Array as PropType<number[]>,
      default: () => [10, 20, 50, 100, 200, 500, 1000],
    },
  },
  emits: ["change", "update:pageSize", "update:pageNumber"],
  setup(props, { emit }) {
    const state = reactive({
      currentPage: 0,
      nowPageSize: 0,
    })
    watch(() => props.pageNumber, (v) => {
      state.currentPage = v
    }, { immediate: true })

    watch(() => props.pageSize, (v) => {
      state.nowPageSize = v
    }, { immediate: true })

    const currentChange = (current:number) => {
      emit("update:pageNumber", current)
      emit("change")
    }

    const sizeChange = (size:number) => {
      emit("update:pageSize", size)
      emit("change")
    }
    return {
      // refs
      ...toRefs(state),

      // func
      currentChange,
      sizeChange,
    }
  },
})
</script>
<style lang="scss" scoped>
  .g_page {
    padding: 5px;
  }
  ::v-deep(.el-pagination){
    justify-content: inherit;
  }
</style>