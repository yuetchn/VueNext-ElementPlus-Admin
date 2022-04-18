<!--
 * @ModuleName: Dialog 对话框
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-18 15:20:30
-->

<template>
  <teleport to="#app">
    <div v-if="modelValue" class="g_dialog_root">
      <div v-if="shade" class="g_dialog_root__shade" @click="close"></div>
      <transition enter-active-class="dialog_enter_active" leave-active-class="m_dialog_leave_active">
        <div class="g_dialog_root__content">
          <div ref="dialogRef" class="m_dialog" tabindex="0" :style="dialogStyle" @keydown.esc="close">
            <!-- title -->
            <div class="dialog_header">
              <slot name="title">
                <div class="dialog_title">{{ title }}</div>
              </slot>
              <div class="dialog_close" @click="close">
                <g-svg-icon size="12" name="close"></g-svg-icon>
              </div>
            </div>
            <!-- content -->
            <div class="dialog_content">
              <slot name="default"></slot>
            </div>
            <!-- footer -->
            <div class="dialog_footer" :style="{ textAlign: align }">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref, nextTick, PropType } from "vue";
import init from "./index";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
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
    /** 距离顶部距离 */
    top: {
      type: String,
      default: "15vh",
    },
    /** 对话框宽度 */
    width: {
      type: String,
      default: "500px",
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
  },
  emits: {
    close: null,
    open: null,
    "update:modelValue": null,
  },
  setup(props, { emit }) {
    const dialogRef = ref();
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
    });

    const open = () => emit("open");
    const close = () => {
      emit("close");
      emit("update:modelValue", false);
    };

    watch(
      () => props.modelValue,
      (v) => {
        if (v) {
          open();
          nextTick(() => {
            dialogRef.value.focus();
            console.log(props);
            init("m_dialog", "dialog_header", props.drag);
          });
        }
      },

      { immediate: true },
    );
    return {
      // ref
      dialogRef,

      // refs
      ...toRefs(state),

      // func
      close,
    };
  },
});
</script>
<style lang="scss" scoped>
  .g_dialog_root {
    position: absolute;
    width: 100%;
    top: 0;
    height: 100%;
    z-index: 1199;
  }

  .g_dialog_root__shade {
    position: absolute;
    z-index: 1200;
    width: 100%;
    top: 0;
    height: 100%;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.55);
  }

  .g_dialog_root__content {
    height: 100%;
    overflow: auto;
    position: relative;
    z-index: 1201;
  }

  .m_dialog {
    position: absolute;
    // left: 50%;
    // transform: translate(-50%, 0);
    border-radius: 4px;
    box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.08);
    background: #ffffff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .dialog_enter_active {
    animation: dialog_enter_active 0.2s ease;
  }

  .m_dialog_leave_active {
    @extend .dialog_enter_active;
    animation-direction: reverse;
  }

  .dialog_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    flex: 0 0 auto;
    height: 40px;
    overflow: hidden;
    padding: 5px;

    .dialog_title {
      padding: 5px;
    }

    .dialog_close {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8px;
      height: 100%;
      border-radius: 4px;
      transition: background-color 0.3s;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }

  .dialog_content {
    padding: 10px;
    min-height: 100px;
    flex: 1;
  }

  .dialog_footer {
    flex: 0 0 auto;
    padding: 10px;
    // text-align: center;
    // border-top: 1px solid rgba(0, 0, 0, 0.08);
  }

  @keyframes dialog_enter_active {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
</style>