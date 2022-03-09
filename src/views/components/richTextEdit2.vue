<!--
 * @ModuleName: richTextEdit
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-09 09:51:07
-->
<template>
  <div class="edit_root">
    <div class="template_li">
      <ul>
        <li v-for="item of templateList" :key="item.id" @click="AppendTemplate(item.content)">
          <div v-html="item.content"></div>
        </li>
      </ul>
    </div>
    <div class="editor">
      <g-editor id="edit" ref="editor" v-model="editValue" :width="600" :height="800"></g-editor>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, reactive, toRefs } from "vue";
import req from "@/utils/request"

export default defineComponent({
  setup() {
    const editor = ref()
    const state = reactive({
      templateList: <any>[],
      editValue: "",
    })

    onMounted(() => {
      GetTemplatePage()
    })

    const GetTemplatePage = async () => {
      const { data } = await req.Post("http://localhost:8088/GetTemplateByPage", { pageSize: 200, pageNumber: 3 })
      if (data.code === 200) {
        state.templateList = data.data
        console.log(data)
      }
    }

    const AppendTemplate = (v: string) => {
      editor.value.insertContent(v)
    }

    return {
      // ref
      editor,

      // refs
      ...toRefs(state),

      // func
      AppendTemplate,
    }
  },
})
</script>
<style lang="scss" scoped>
  .edit_root {
    display: flex;
    height: 100%;
  }

  .template_li {
    width: 300px;
    margin-right: 20px;
    background: #FFF;
    padding: 10px;
    overflow: auto;
    height: 100%;
    flex: 0 0 auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  ul {
    padding: 0;

  }

  ul>li {
    list-style-type: none;
    margin: 10px 0;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    transition: all 0.3s;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      cursor: pointer;
      border: 1px solid rgba(0, 0, 0, 0.15);
      box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.05);
    }
  }

  .editor {
    padding: 10px;
    background: #FFF;
    height: 100%;
    display: flex;
    justify-content: center;
    flex: 1;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }
</style>