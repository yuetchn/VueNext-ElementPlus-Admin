<template>
  <div style="height: 100%">
    <el-row :gutter="15">
      <el-col :span="6">
        <div class="m_card_item">
          <div class="card_left">
            <div class="u_card_num">{{ $func.FormatNumber(12312311) }}</div>
            <div>访问人数</div>
          </div>
          <div class="card_right">
            <g-svg-icon size="38" color="#409EFF" name="dashboard-count"></g-svg-icon>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="m_card_item">
          <div class="card_left">
            <div class="u_card_num">{{ $func.FormatNumber(56847512) }}</div>
            <div>动态</div>
          </div>
          <div class="card_right">
            <g-svg-icon size="38" color="#409EFF" name="dashboard-dt"></g-svg-icon>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="m_card_item">
          <div class="card_left">
            <div class="u_card_num">{{ $func.FormatNumber(23232456) }}</div>
            <div>关注</div>
          </div>
          <div class="card_right">
            <g-svg-icon size="38" color="#409EFF" name="dashboard-gz"></g-svg-icon>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="m_card_item">
          <div class="card_left">
            <div class="u_card_num">{{ $func.FormatNumber(45633213) }}</div>
            <div>订阅</div>
          </div>
          <div class="card_right">
            <g-svg-icon size="38" color="#409EFF" name="dashboard-watch"></g-svg-icon>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 15px" :gutter="15">
      <el-col :span="16">
        <div style="background-color: #fff; border-radius: 4px">
          <g-chart height="500px" :options="lineOptions"></g-chart>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="background-color: #fff; border-radius: 4px">
          <g-chart height="500px" :options="pieOptions"></g-chart>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top:15px;">
      <el-col :span="24">
        <user style="padding:0;" />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import user from "@/views/components/user.vue"

export default defineComponent({
  components: { user },
  setup() {
    return {
      lineOptions: {
        title: {
          text: "访问人数",
          left: "center",
          padding: 10,
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        tooltip: {
          show: true,
        },
        yAxis: {
          type: "value",
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          smooth: true,
        }],
      },
      pieOptions: {
        title: {
          left: "center",
          padding: 10,
          text: "来源",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "8%",
          left: "center",
        },
        series: [{
          name: "来源",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "网络" },
            { value: 735, name: "官网" },
            { value: 580, name: "朋友" },
            { value: 484, name: "链接" },
            { value: 300, name: "广告" },
          ],
        }],
      },
    };
  },
});
</script>
<style lang="scss" scoped>
  .m_card_item {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 25px;
    padding-bottom: 40px;
    height: 120px;

    .card_left {
      flex: 1;
    }

    .card_right {
      padding: 15px;
      transition: all 0.3s;
    }

    .u_card_num {
      font-size: 30px;
      transition: all 0.3s;
    }

    &:hover {
      cursor: pointer;

      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.08);

      .card_right {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
      }
    }
  }
</style>