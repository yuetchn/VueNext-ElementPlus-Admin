/*
 * @ModuleName: EChartsComponent Setup
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-25 11:04:17
 */

import { watch } from "vue";
import { ECharts } from "echarts";
import { useStore } from "@/store";

export default (charts: ECharts) => {
  const store = useStore();
  watch(
    () => store.state.AppModule.clientWidth,
    () => charts.resize(),
  );
  watch(
    () => store.state.AppModule.isShrink,
    () => {
      setTimeout(() => {
        charts.resize();
      }, 500);
    },
  );
};
