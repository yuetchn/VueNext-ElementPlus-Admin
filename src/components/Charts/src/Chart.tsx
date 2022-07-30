/*
 * @ModuleName: Cahrt
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-25 11:06:13
 */

import { defineComponent, onMounted, reactive, toRefs, ref, watch } from "vue";
import * as charts from "echarts";
import { chartProps } from "./options";
import useEchart from "./setup";

export default defineComponent({
  props: chartProps,
  setup(props) {
    const state = reactive({});
    const domRef = ref();
    let echarts: charts.ECharts;

    onMounted(() => {
      echarts = charts.init(domRef.value, undefined, {
        renderer: "canvas",
        width: props.width as any,
        height: props.height as any,
      });

      echarts.setOption(props.options);

      useEchart(echarts);
    });

    watch(
      () => props.options,
      (v) => {
        echarts?.setOption(v);
      },
      { deep: true },
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
