<!--
 * @ModuleName: App
 * @Author: 乐涛
 * @LastEditTime: 2022-01-19 17:45:58
-->
<template>
  <suspense>
    <router-view />
  </suspense>
  <g-loading-shade></g-loading-shade>
</template>

<script lang="ts" setup></script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

#app{
  height:100%;
}
</style>
