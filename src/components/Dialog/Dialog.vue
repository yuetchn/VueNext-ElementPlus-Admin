<!--
 * @ModuleName: Dialog 对话框
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 16:58:07
-->

<template>
  <teleport to="body">
    <div v-if="modelValue && shade" class="m_dialog_shade" @click="close"></div>
    <transition enter-active-class="m_dialog_enter_active" leave-active-class="m_dialog_leave_active">
      <div v-if="modelValue" ref="dialogRef" class="m_dialog" tabindex="0" :style="dialogStyle" @keydown.esc="close">
        <!-- title -->
        <div class="m_dialog_header">
          <slot name="title">{{ title }}</slot>
        </div>
        <!-- content -->
        <div class="m_dialog_content">
          <slot name="default"></slot>
        </div>
        <!-- footer -->
        <div class="m_dialog_footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref, nextTick } from "vue";

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
  },
  emits: {
    close: null,
    open: null,
    "update:modelValue": null,
  },
  setup(props, { emit }) {
    const dialogRef = ref();
    const state = reactive({
      dialogStyle: props.isFull
        ? {
          top: 0,
          width: "100%",
          height: "100%",
        }
        : {
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
          });
        }
      },
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
.m_dialog_shade {
  position: absolute;
  z-index: 899;
  width: 100%;
  top: 0;
  height: 100%;
  cursor: pointer;
  // background: rgba(0, 0, 0, 0.1);
}

.m_dialog {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 900;
  border-radius: 4px;
  box-shadow: 0 0 15px 3px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.m_dialog_enter_active {
  animation: dialog_enter_active 0.2s ease;
}
.m_dialog_leave_active {
  @extend .m_dialog_enter_active;
  animation-direction: reverse;
}

.m_dialog_header {
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  flex: 0 0 auto;
}

.m_dialog_content {
  padding: 10px;
  min-height: 100px;
  flex: 1;
}

.m_dialog_footer {
  flex: 0 0 auto;
  padding: 10px;
  text-align: center;
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
