<!--
 * @ModuleName: Dialog 对话框
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-19 21:27:57
-->

<template>
  <teleport to="#app">
    <transition enter-active-class="g_dialog_enter_active" leave-active-class="g_dialog_leave_active">
      <div v-show="modelValue" ref="dialogRootRef" class="g_dialog_root">
        <div v-show="shade" class="g_dialog_root__shade"></div>
        <div class="g_dialog_root__content" @click.prevent="close">
          <div ref="dialogRef" class="g_dialog" tabindex="0" :style="dialogStyle" @click.stop="()=>{}" @keydown.esc="close">
            <!-- title -->
            <div class="g_dialog_header">
              <slot name="title">
                <div class="dialog_title">{{ title }}</div>
              </slot>
              <div v-if="showClose" class="dialog_close" @click="close">
                <g-svg-icon size="12" name="close"></g-svg-icon>
              </div>
            </div>
            <!-- content -->
            <div class="g_dialog_content" :style="dialogContentStyle">
              <slot name="default"></slot>
            </div>
            <!-- footer -->
            <div class="dialog_footer" :style="{ textAlign: align }">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref, nextTick, PropType } from "vue";
import init from "./index";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    /** 标题 */
    title: {
      type: String,
      default: "",
    },
    /** 是否拖拽 */
    drag: {
      type: Boolean,
      default: false,
    },
    /** 遮罩层是否显示 */
    shade: {
      type: Boolean,
      default: true,
    },
    /** 是否显示关闭按钮 */
    showClose: {
      type: Boolean,
      default: true,
    },
    /** 是否通过点击Model关闭dialog */
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    /** 距离顶部距离 */
    top: {
      type: String,
      default: "15vh",
    },
    /** 对话框宽度 */
    width: {
      type: String,
      default: "900px",
    },
    /** 对话框高度 */
    height: {
      type: String,
      default: "auto",
    },
    /** 是否全屏 */
    isFull: {
      type: Boolean,
      default: false,
    },
    /** 底部对齐格式 */
    align: {
      type: String as PropType < "left" | "center" | "right" >,
      default: "center",
    },
    /** 弹窗内容内边距, */
    padding: {
      type: String,
      default: "20px 50px",
    },
  },
  emits: {
    close: null,
    open: null,
    "update:model-value": null,
  },
  setup(props, { emit }) {
    const dialogRef = ref();
    const dialogRootRef = ref();
    const state = reactive({
      dialogStyle: props.isFull ? {
        top: 0,
        width: "100%",
        height: "100%",
      } : {
        top: props.top,
        width: props.width,
        height: props.height,
      },
      dialogContentStyle: {
        padding: props.padding,
      },
    });

    const open = () => emit("open");
    const close = () => {
      if (!props.closeOnClickModal) { return }
      emit("update:model-value", false);
    };

    watch(
      () => props.modelValue,
      (v) => {
        if (v) {
          open();
          nextTick(() => {
            dialogRef.value.focus();
            if (props.drag) {
              init(dialogRootRef.value, "g_dialog", "g_dialog_header");
            }
          });
        } else {
          emit("close")
        }
      },

      { immediate: false },
    );
    return {
      // refs
      ...toRefs(state),
      dialogRef,
      dialogRootRef,

      // func
      close,
    };
  },
});
</script>