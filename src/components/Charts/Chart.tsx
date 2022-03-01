/*
 * @ModuleName: Cahrt
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-01 13:21:25
 */

import { defineComponent, onMounted, reactive, toRefs, ref, watch } from "vue";
import * as charts from "echarts";
import ChartProps from "./index";
import useEchart from "./setup";

export default defineComponent({
  props: ChartProps,
  setup(p) {
    const state = reactive({});
    const domRef = ref();
    let echarts: charts.ECharts;

    onMounted(() => {
      echarts = charts.init(domRef.value, undefined, {
        renderer: "canvas",
        width: p.width as any,
        height: p.height as any,
      });

      echarts.setOption(p.options);

      useEchart(echarts);
    });

    watch(
      () => p.options,
      (v) => {
        echarts?.setOption(v);
      },
    );

    return {
      // ref
      domRef,

      // refs
      ...toRefs(state),

      // func
    };
  },
  render() {
    return <div ref="domRef"></div>;
  },
});
