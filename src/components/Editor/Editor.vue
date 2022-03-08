<template>
  <textarea :id="id" />
</template>

<script lang="ts">
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver/theme"; // 引用主题文件
import "tinymce/icons/default"; // 引用图标文件
import "tinymce/plugins/link";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink"; // 锚点
// import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap"; // 特殊字符
import "tinymce/plugins/code"; // 查看源码
import "tinymce/plugins/codesample"; // 插入代码
import "tinymce/plugins/directionality"; //
import "tinymce/plugins/fullscreen"; // 全屏
import "tinymce/plugins/help"; // 帮助
import "tinymce/plugins/hr"; // 横线
import "tinymce/plugins/image"; // 图片
import "tinymce/plugins/importcss"; // 图片工具
import "tinymce/plugins/insertdatetime"; // 时间插入
import "tinymce/plugins/media"; // 媒体插入
import "tinymce/plugins/nonbreaking"; //
import "tinymce/plugins/noneditable"; // 不间断空格
import "tinymce/plugins/pagebreak"; // 分页
import "tinymce/plugins/paste"; // 粘贴
import "tinymce/plugins/preview"; // 预览
import "tinymce/plugins/print"; // 打印
import "tinymce/plugins/quickbars"; // 快捷菜单
import "tinymce/plugins/save"; // 保存
import "tinymce/plugins/searchreplace"; // 查询替换
import "tinymce/plugins/tabfocus";
import "tinymce/plugins/template"; // 插入模板
import "tinymce/plugins/textpattern";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";
import { defineComponent, onMounted, nextTick, reactive, toRefs, watch, onUnmounted } from "vue";

// 数字统计
export default defineComponent({
  props: {
    id: {
      type: String,
      default: "editor",
    },
    modelValue: {
      type: String,
      default: "",
    },
    height: {
      type: [String, Number],
      default: "",
    },
    minHeight: {
      type: [String, Number],
      default: 150,
    },
    width: {
      type: Number,
      default: 0,
    },
  },
  emits: { "update:modelValue": null },
  setup(props, context) {
    const state = reactive({
      init: {
        selector: `#${ props.id }`,
        height: props.height,
        language_url: "tinymce/langs/zh_CN.js", // 中文语言包路径
        language: "zh_CN",
        min_height: props.minHeight,
        width: props.width ? props.width : "",
        skin_url: "tinymce/skins/ui/oxide", // 编辑器皮肤样式
        content_css: "tinymce/skins/content/default/content.css",
        menubar: false, // 隐藏菜单栏
        // autoresize_bottom_margin: 50,
        //   max_height: 500,
        //   min_height: 350,
        toolbar_mode: "none",
        // plugins:
        //   "wordcount visualchars visualblocks textpattern template tabfocus searchreplace save quickbars print preview paste pagebreak noneditable nonbreaking media insertdatetime importcss image hr help fullscreen directionality codesample code charmap link code table lists advlist anchor autolink autoresize autosave", // 插件需要import进来
        plugins:
          "wordcount visualchars visualblocks textpattern template tabfocus searchreplace save quickbars print preview paste pagebreak noneditable nonbreaking media insertdatetime importcss image hr help fullscreen directionality codesample code charmap link code table lists advlist anchor autolink autosave", // 插件需要import进来
        toolbar:
          "formats undo redo paste print fontsizeselect fontselect template wordcount ltr rtl visualchars visualblocks searchreplace|save preview pagebreak nonbreaking|media image|outdent indent aligncenter alignleft alignright alignjustify lineheight  underline quicklink h2 h3 blockquote numlist bullist table removeformat forecolor backcolor bold italic  strikethrough hr charmap link insertdatetime|subscript superscript cut codesample code |anchor preview fullscreen|help",
        content_style: "p {margin: 5px 0; font-size: 14px}",
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
        branding: false,
        elementpath: false,
        resize: false, // 禁止改变大小
        statusbar: false, // 隐藏底部状态栏
        // 图片上传
        images_upload_handler(blobInfo: any, success: Function) {
          const reader = new FileReader();
          reader.readAsDataURL(blobInfo.blob());
          reader.onload = function () {
            success(this.result);
          };
        },
        setup: (ed: any) => {
          ed.on("change input", () => {
            state.flag = false
            state.content = ed.getContent();
          });
        },
      },
      content: "",
      flag: true,
    });

    onMounted(async () => {
      // init
      await tinymce.init(state.init as any);
      tinymce.editors[props.id as any].setContent(props.modelValue);
      cursorGoEnd()
    });

    onUnmounted(() => {
      tinymce.editors[props.id as any].destroy();
    });
 
    /** 光标移动到最后 */
    const cursorGoEnd = () => {
      const editor = tinymce.editors[props.id as any];
      editor.execCommand("selectAll");
      editor.selection.getRng().collapse(false);
      editor.focus();
    }
    /** 插入内容 */
    const insertContent = (v: string) => tinymce.editors[props.id as any].insertContent(v);
    /** 复制选中内容 */
    const copyContent = () => tinymce.editors[props.id as any].execCommand("copy");
    watch(
      () => props.modelValue,
      (v: string) => {
        state.content = v;
        if (!state.flag) { 
          state.flag = true
          return 
        }
        nextTick(() => {
          tinymce.editors[props.id as any].setContent(v);
        });
      },
    );
    watch(
      () => state.content,
      (v: string) => {
        context.emit("update:modelValue", v);
      },
    );
    return {
      // refs
      ...toRefs(state),

      // func
      insertContent,
      copyContent,
      cursorGoEnd,
    };
  },
  data() {
    return {
      content: this.modelValue,
    };
  },
});
</script>