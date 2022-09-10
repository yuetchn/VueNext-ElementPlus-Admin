<!--
 * @ModuleName: 菜单按钮
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-10 16:27:10
-->
<template>
  <div>
    <g-dialog v-model="dialogVis" width="400px" title="新增按钮" @close="dialogClose">
      <el-form ref="btnFormRef" v-loading="btnFormLoading" :model="btnForm" label-suffix="：" label-width="100px">
        <el-form-item required label="按钮名称" prop="name">
          <el-input v-model.trim="btnForm.name" maxlength="50" clearable placeholder="按钮名称" />
        </el-form-item>
        <el-form-item required label="唯一标识" prop="key">
          <el-input v-model.trim="btnForm.key" maxlength="50" clearable placeholder="唯一标识" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVis = false">取消</el-button>
        <el-button type="primary" :loading="btnFormLoading" @click="btnSubmit">确认</el-button>
      </template>
    </g-dialog>
  </div>
</template>
<script lang="ts">
import { ref, reactive, defineProps, defineEmits, watch, computed } from "vue"
import { message } from "ant-design-vue"
import { FormInstance } from "element-plus"
import { SaveOrUpdateBtn } from "@/api/v1/system/menu"

export default {}
</script>
<script lang="ts" setup>
const props = defineProps({
  visible: { default: false, type: Boolean, required: true },
  id: { default: 0, type: Number, required: true },
})
const emits = defineEmits(["success", "update:visible"])
const dialogVis = ref(false)
const btnFormRef = ref<FormInstance>()
const btnFormLoading = ref(false)

const menuId = computed(() => props.id)

const btnForm = reactive({
  menu_id: menuId,
  name: "",
  key: "",
})

watch(() => props.visible, (v) => {
  dialogVis.value = v
})

watch(dialogVis, (v) => {
  emits("update:visible", v)
})

const btnSubmit = () => {
  btnFormRef.value?.validate(async (v) => {
    if (!v) {
      return
    }
    try {
      btnFormLoading.value = true
      const { data } = await SaveOrUpdateBtn(btnForm)
      if (data.code === 200) {
        message.success(data.msg)
        btnFormRef.value?.resetFields()
        dialogVis.value = false
        emits("success")
      }
    } finally {
      btnFormLoading.value = false
    }
  })
}

const dialogClose = () => {
  btnFormRef.value?.resetFields()
}
</script>