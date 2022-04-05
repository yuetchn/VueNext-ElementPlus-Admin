/*
 * @ModuleName: QrCode
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-03-26 22:03:47
 */
import { defineComponent, onMounted, ref } from "vue";
import qr from "qrcode"

export default defineComponent({
  props: {
    /** 内容 */
    value: {
      type: String,
      default: "",
    },
    /** 背景色,默认: #ffffffff */
    backgroundColor: {
      type: String,
      default: "#ffffffff",
    },
    /** 颜色,默认: #000000ff */
    color: {
      type: String,
      default: "#000000ff",
    },
    /** 边距,默认: 3 */
    margin: {
      type: Number,
      default: 3,
    },
    /** 宽度(高度),默认: 150 */
    width: {
      type: Number,
      default: 150,
    },
    /** 比例因子,默认: 5 */
    scale: {
      type: Number,
      default: 5,
    },
  },
  setup(props) {
    const qrCode = ref()

    onMounted(async () => {
      await create(props.value)
    })

    /**
         * 重新绘制创建二维码
         * @param value 二维码内容
         */
    const create = async (value: string) => {
      await qr.toCanvas(qrCode.value, value, {
        color: {
          dark: props.color,
          light: props.backgroundColor,
        },
        margin: props.margin,
        width: props.width,
        scale: props.scale,
      })
    }

    return {
      // ref
      qrCode,

      // func
      create,
    }
  },
  render() {
    return (
      <canvas ref="qrCode"></canvas>
    )
  },
})