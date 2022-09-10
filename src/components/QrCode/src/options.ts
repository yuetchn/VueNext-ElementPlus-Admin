/*
 * @ModuleName: QrCode Options
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-09-10 15:41:54
 */
 
export const qrCodeProps = {
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
}
