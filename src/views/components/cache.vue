<!--
 * @ModuleName: Cache
 * @Author: 乐涛
 * @LastEditTime: 2022-09-03 10:25:28
-->
<template>
  <div class="app-container container">
    <div class="nav">
      <el-alert type="success">
        存储在vuex的数据都是响应式的，能够实时保持数据与页面的同步。结合localStorage 或者 sessionStorage 实现Vuex本地持久化。
      </el-alert>
    </div>
    <div class="pan">
      <el-tabs @tab-change="tabChange">
        <el-tab-pane label="Vuex">
          <g-table row-key="id" :data="storeComputed" :columns="storeColumns"></g-table>
        </el-tab-pane>
        <el-tab-pane label="LocalStorage" name="local">
          <g-table :columns="storageColumns" :data="localStorageData"></g-table>
        </el-tab-pane>
        <el-tab-pane label="SessionStorage" name="session">
          <g-table :columns="storageColumns" :data="sessionStorageData"></g-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from "vue"
import { TableColumns } from "@/types"
import { useStore } from "@/store"

export default defineComponent({
  setup() {
    const state = reactive({
      storeColumns: [{
        label: "索引",
        prop: "index",
        type: "index",
        width: 90,
      },
      {
        label: "模块",
        prop: "module",
      },
      {
        label: "key",
        prop: "key",
      },
      {
        label: "value",
        prop: "value",
      },
      ] as TableColumns[],
      storageColumns: [{
        label: "索引",
        prop: "index",
        type: "index",
        width: 90,
      },
      {
        label: "key",
        prop: "key",
      },
      {
        label: "value",
        prop: "value",
      },
      ] as TableColumns[],
      localStorageData: [] as any[],
      sessionStorageData: [] as any[],
    })
    const store = useStore()
    onMounted(() => {
      state.localStorageData = getStorageData("local")
      state.sessionStorageData = getStorageData("session")
    })

    const storeComputed = computed(() => {
      const data = []
      for (const i in store.state) {
        const _module = (store.state as any)[i]
        const _m = {
          id: i,
          module: i,
          key: "-",
          value: "-",
          children: [] as any[],
        }
        if (typeof _module === "object") {
          for (const m in _module) {
            _m.children.push({
              id: m,
              module: "-",
              key: m,
              value: _module[m],
              children: [],
            })
          }
        } else {
          _m.key = i
          _m.value = _module
        }
        data.push(_m)
      }
      return data
    })

    const getStorageData = (type: string) => {
      const data = []
      const storage = type === "local" ? localStorage : sessionStorage
      for (let i = 0; i < storage.length; i++) {
        const _key = storage.key(i)
        if (_key) {
          data.push({
            key: _key,
            value: storage.getItem(_key),
          })
        }
      }
      return data
    }

    const tabChange = (val: string | number) => {
      switch (val) {
        case "local":
          state.localStorageData = getStorageData(val)
          break;
        case "session":
          state.sessionStorageData = getStorageData(val)
          break;
        default:
          break;
      }
    }

    return {
      // refs
      ...toRefs(state),

      // computed
      storeComputed,

      // func
      tabChange,
    }
  },
})
</script>
<style lang="scss" scoped>
  ::v-deep(.el-tabs) {
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  ::v-deep(.el-tabs__content) {
    flex: 1;
  }

  ::v-deep(.el-tab-pane) {
    height: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;

    .nav {
      flex: 0 0 auto;
    }

    .pan {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
  }
</style>