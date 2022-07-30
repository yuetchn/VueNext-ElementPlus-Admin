/*
 * @ModuleName: QrCode
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-25 11:25:03
 */
import { defineComponent, onMounted, ref } from "vue";
import qr from "qrcode";
import { qrCodeProps } from "./options";

export default defineComponent({
  props: qrCodeProps,
  setup(props) {
    const qrCode = ref();

    onMounted(async () => {
      await create(props.value);
    });

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
      });
    };

    return {
      // ref
      qrCode,

      // func
      create,
    };
  },
  render() {
    return <canvas ref="qrCode"></canvas>;
  },
});
