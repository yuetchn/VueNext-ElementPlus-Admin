<!--
 * @ModuleName: ViewTag
 * @Author: 乐涛
 * @LastEditTime: 2022-02-09 13:53:06
-->
<template>
  <div class="m_view_tag">
    <div class="m_view_tags">
      <el-scrollbar style="width: 100%">
        <div class="m_view_tag_scrollbar">
          <div v-for="(item, i) in viewTags" :key="i" class="u_view_tag" :class="{ u_view_tag__active: item.path === selTag.path }" @click="$router.push(item.path)" @mouseenter="showIndex = i" @mouseleave="showIndex = -1">
            <div v-if="selTag.path === item.path" class="beforeTip"></div>
            <div class="tag_title">
              {{ item.meta.title || "Not Title" }}
            </div>
            <div v-if="(showIndex === i || selTag.path === item.path) && !item.meta.affix" class="tag_close" @click.stop="closeTag(item)">
              <g-svg-icon name="close" color="#333333" size="8"></g-svg-icon>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <div class="m_view_operate" @click="closeAllTag">
      <!-- Close All -->
      <g-svg-icon name="close" size="13"></g-svg-icon>
      <!-- <el-dropdown>
        <g-svg-icon name="down" size="10"></g-svg-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, toRefs, reactive, computed } from "vue";
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      initTags: computed(() => store.state.ViewTagModule.initTags),
      selTag: computed(() => <RouteLocationNormalizedLoaded>store.getters["ViewTagModule/getTag"]),
      showIndex: -1,
    });

    const viewTags = computed(() => [...state.initTags, ...store.state.ViewTagModule.viewTags]);

    const closeTag = async (t: RouteLocationNormalizedLoaded) => {
      await store.dispatch("ViewTagModule/delTag", { ...t });

      if (t.path === state.selTag.path) {
        viewTags.value.length - state.initTags.length === 0 ? router.replace("/") : router.go(-1);
      }
    };
    const closeAllTag = () => {
      store.dispatch("ViewTagModule/closeAllTag");
      router.replace("/");
    };
    watch(
      () => route,
      (v) => {
        if (v.meta.noTag) {
          return;
        }

        store.dispatch("ViewTagModule/setTag", { ...v });
        if (!v.meta.affix) {
          const index = state.initTags.findIndex((f) => f.path === v.path);
          index === -1 && store.dispatch("ViewTagModule/addViewTag", { ...v });
        }
      },
      { immediate: true, deep: true },
    );

    return {
      // refs
      ...toRefs(state),

      // computed
      viewTags,

      // func
      closeTag,
      closeAllTag,
    };
  },
});
</script>
<style lang="scss" scoped>
.m_view_tag {
  height: 35px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 200;
  display: flex;
  align-items: center;
}

.m_view_tags {
  flex: 1;
  padding: 5px 10px 0;
}

.m_view_operate {
  width: 60px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
}
.u_view_tag {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  margin-right: 5px;
  padding: 3px 8px 3px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
  transition-property: padding, background-color;
  transition-duration: 0.3s, 0.5s;
  flex: 0 0 auto;
  display: flex;
  align-items: center;

  .beforeTip {
    padding: 5px;
    background-color: #e6e6e6;
    border-radius: 50%;
    margin-right: 5px;
  }
  .tag_title {
    transition: all 0.5s;
    flex: 1;
  }

  .tag_close {
    width: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-left: 5px;
    border-radius: 50%;
    overflow: hidden;
  }

  &:hover {
    padding-left: 20px;
    // padding-right: 25px;
    .tag_title {
      margin-right: 10px;
    }

    background-color: #333;
  }
}

.m_view_tag_scrollbar {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
}

.u_view_tag__active {
  background-color: #333;
}
</style>
