<!--
 * @ModuleName: User
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-23 16:40:42
-->
<template>
  <div class="user_root">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="user_info">
          <div class="head">
            <img src="https://portrait.gitee.com/uploads/avatars/user/1842/5526674_yuetchn_admin_1642658194.png!avatar200" />
          </div>
          <div class="nick">
            YuetChn
          </div>
          <div>
            是个吃货🧀
          </div>
          <div class="desc">
            <div>
              <g-svg-icon name="email"></g-svg-icon>
              yuetchn@163.com
            </div>
            <div>
              <g-svg-icon name="qq"></g-svg-icon>
              2024546201
            </div>
            <div>
              <g-svg-icon name="wx"></g-svg-icon>
              17608411530
            </div>
            <div class="labels">
              <span>00后</span>
              <span>吃货</span>
              <span>游戏</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="gitee_info">
          <a href="https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin">
            <img src="https://gitee.com/yuetchn_admin/VueNext-ElementPlus-Admin/widgets/widget_card.svg?colors=4183c4,ffffff,ffffff,e3e9ed,666666,9b9b9b" />
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  
})
</script>
<style lang="scss" scoped>
  .el-row {
    height: 100%;
  }

  .user_root {
    background-color: #F8F8F8;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    color: #666666;
    font-size: 14px;
    font-weight: 400;
  }

  .user_info {
    background: #ffffff;
    border-radius: 4px;
    padding: 15px;
    height: 100%;
    text-align: center;
    line-height: 40px;

    .head {
      width: 100%;
      text-align: center;
      margin-bottom: 20px;

      img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        overflow: hidden;
      }
    }

    .nick {
      font-weight: bold;
      font-size: 22px;
    }

    .desc {
      line-height: 28px;
    }

    .labels {
      span {
        padding: 3px 8px;
        background: #EFEFEF;
        border-radius: 5px;
        margin-right: 8px;
        font-size: 12px;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .gitee_info {
    border-radius: 4px;
    background: #ffffff;
    padding: 15px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      width: 60%;
    }

    img {
      width: 100%;
    }
  }
</style>