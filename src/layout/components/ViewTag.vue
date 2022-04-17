<!--
 * @ModuleName: ViewTag
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-15 10:19:10
-->
<template>
  <div class="view_tag">
    <div class="view_tags">
      <el-scrollbar ref="tagScrollBar" style="width: 100%">
        <div class="view_tag_scrollbar" @mouseenter="tagMouseEnter">
          <div v-for="(item, i) in viewTags" :key="i" class="u_view_tag" :class="{ u_view_tag__active: item.path === selTag.path }" @click="$router.push(item.path)" @mouseenter="showIndex = i" @mouseleave="showIndex = -1">
            <div v-if="selTag.path === item.path" class="beforeTip"></div>
            <div class="tag_title">
              <!-- {{ item.meta.title || "Not Title" }} -->
              {{ $t(item.name?.toString() || "") === item.name ? item.meta.title : $t(item.name?.toString() || "") }}
            </div>
            <div v-if="!item.meta.affix" class="tag_close" @click.stop="closeTag(item)">
              <g-svg-icon name="close" color="#333333" size="6"></g-svg-icon>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <el-tooltip :content="$t('navBar.closeAllTags')" placement="left">
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
    </el-tooltip>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, ref, toRefs, reactive, computed } from "vue";
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from "vue-router";
import { useStore } from "@/store";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const tagScrollBar = ref()
    const tagViewMax = ref<number>(0)
    const tagViewNow = ref<number>(0)
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

    const tagMouseEnter = (e:MouseEvent) => {
      const _d = (e.target as HTMLDivElement)
      tagViewMax.value = _d.scrollWidth - _d.clientWidth
      e.target?.addEventListener("wheel", tagWhell as any)
      e.target?.addEventListener("mouseleave", tagMouseLeave as any)
    }

    const tagMouseLeave = (e:MouseEvent) => {
      e.target?.removeEventListener("wheel", tagWhell as any)
      e.target?.removeEventListener("mouseenter", tagMouseEnter as any)
      e.target?.removeEventListener("mouseleave", tagMouseLeave as any)
    }

    const tagWhell = (e:WheelEvent) => {
      if (Math.sign(e.deltaY) === 1 && tagViewNow.value + 10 <= tagViewMax.value) {
        tagViewNow.value += 10
      } else if (Math.sign(e.deltaY) === -1 && tagViewNow.value !== 0 && tagViewNow.value - 10 >= 0) {
        if (tagViewNow.value - 10 < 10) {
          tagViewNow.value = 0;
        } else {
          tagViewNow.value -= 10
        }
      } else {
        return
      }
      tagScrollBar.value.setScrollLeft(tagViewNow.value)
    }
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
      // ref
      tagScrollBar,
      
      // refs
      ...toRefs(state),

      // computed
      viewTags,

      // func
      closeTag,
      closeAllTag,
      tagMouseEnter,
    };
  },
});
</script>
<style lang="scss" scoped>
.view_tag {
  height: 35px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 200;
  display: flex;
  align-items: center;
}

.view_tags {
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
  font-size: 11px;
  color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: $g-tagView-background-color__active;
  }
}
.u_view_tag {
  background-color: $g-tagView-background-color;
  color: $g-tagView-color;
  margin-right: 5px;
  padding: 3px 8px 3px 15px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 11px;
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
    width: 14px;
    height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-left: 5px;
    border-radius: 50%;
    overflow: hidden;
  }

  &:hover {
    // padding-left: 20px;
    // // padding-right: 25px;
    // .tag_title {
    //   margin-right: 10px;
    // }

    background-color: #333;
  }
}

.view_tag_scrollbar {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
}

.u_view_tag__active {
  background-color: #333;
}
</style>
