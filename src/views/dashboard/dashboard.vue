<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="6">
        <div class="m_card_item">
          <div class="m_card_left">
            <div class="u_card_num">{{ $func.formatNumber(12312311) }}</div>
            <div>访问人数</div>
          </div>
          <div class="m_card_right">
            <g-svg-icon size="38" color="#409EFF" name="dashboard-count"></g-svg-icon>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="m_card_item">
          <div class="m_card_left">
            <div class="u_card_num">{{ $func.formatNumber(56847512) }}</div>
            <div>动态</div>
          </div>
          <div class="m_card_right">
            <g-svg-icon size="38" color="#409EFF" name="dashboard-dt"></g-svg-icon>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="m_card_item">
          <div class="m_card_left">
            <div class="u_card_num">{{ $func.formatNumber(23232456) }}</div>
            <div>关注</div>
          </div>
          <div class="m_card_right">
            <g-svg-icon size="38" color="#409EFF" name="dashboard-gz"></g-svg-icon>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="m_card_item">
          <div class="m_card_left">
            <div class="u_card_num">{{ $func.formatNumber(45633213) }}</div>
            <div>订阅</div>
          </div>
          <div class="m_card_right">
            <g-svg-icon size="38" color="#409EFF" name="dashboard-watch"></g-svg-icon>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row style="margin-top: 15px" :gutter="15">
      <el-col :span="16">
        <div style="background-color: #fff; padding: 10px; border-radius: 4px">
          <g-chart-line></g-chart-line>
        </div>
      </el-col>
      <el-col :span="8">
        <div style="background-color: #fff; padding: 10px; border-radius: 4px">
          <g-chart-line></g-chart-line>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.m_nav_card {
}

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

  .m_card_left {
    flex: 1;
  }

  .m_card_right {
    padding: 15px;
    transition: all 0.3s;
  }
  .u_card_num {
    font-size: 30px;
    transition: all 0.3s;
  }

  &:hover {
    cursor: pointer;
    .u_card_num {
      font-size: 33px;
    }
    .m_card_right {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 8px;
    }
  }
}
</style>
