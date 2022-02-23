<!--
 * @ModuleName: CahrtLine
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-25 11:05:27
-->
<template>
  <div ref="domRef" style="width: 100%; height: 500px">测试</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
import * as charts from "echarts";
import useEchart from "./setup";

export default defineComponent({
  setup() {
    const state = reactive({});
    const domRef = ref();
    let echarts = null;

    onMounted(() => {
      echarts = charts.init(domRef.value, undefined, {
        renderer: "canvas",
        // width: 200,
        // height: 200,
      });

      echarts.setOption({
        title: {
          text: "测试图表",
        },
        xAxis: {
          name: "X",
        },
        yAxis: {
          name: "Y",
        },
        series: {
          type: "line",
          data: [
            [0, 13],
            [1, 8],
            [2, 0],
          ],
        },
      });

      useEchart(echarts);
    });
    return {
      // ref
      domRef,

      // refs
      ...toRefs(state),

      // func
    };
  },
});
</script>
