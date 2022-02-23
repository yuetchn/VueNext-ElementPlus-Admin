<!--
 * @ModuleName: 404 Page
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-01-24 15:43:20
-->
<template>
  <div class="m_404">
    <div>
      <g-svg-icon size="400" name="404-img"></g-svg-icon>
    </div>
    <div class="m_404_desc">
      <div class="u_title">页面不见了~</div>
      <div class="u_desc">你可以联系管理员,或者返回上一级菜单。</div>
      <div class="u_back" @click="$router.go(-1)">返回上一级</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.m_404 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.m_404_desc {
  padding: 0 100px;
  line-height: 50px;
  .u_title {
    color: #387cfd;
    font-weight: bold;
    font-size: 45px;
  }

  .u_desc {
    font-size: 15px;
    color: rgba(0, 0, 0, 0.25);
  }

  .u_back {
    padding: 5px 25px;
    border-radius: 50px;
    color: #fff;
    background: #387cfd;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    margin-top:50px;
  }
}
</style>
