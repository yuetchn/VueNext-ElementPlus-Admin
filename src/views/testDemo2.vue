<!--
 * @ModuleName: 
 * @Author: 乐涛
 * @LastEditTime: 2022-01-19 17:46:13
-->
<template>
  <div>
    <g-dialog v-model="show" title="DDDDDDDDDDDDD" @close="$message.info('关闭')" @open="$message.info('开启')"></g-dialog>
    <button @click="show = !show">显示</button>
    {{ show }}
    <button @click="$router.push('/test/index')">testDemo</button>
    <button @click="create">创建</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { CreateMessage } from "@/components/Message/message_func";
import { md5 } from "@/utils/func";

export default defineComponent({
  name: "TestDemo",
  setup() {
    const state = reactive({
      show: false,
    });

    onMounted(() => {
      console.log(md5("123456"));
    });

    const create = () => {
      CreateMessage();
    };

    return {
      // refs
      ...toRefs(state),

      // func
      create,
    };
  },
});
</script>
