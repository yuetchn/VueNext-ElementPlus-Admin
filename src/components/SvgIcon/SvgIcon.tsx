import { defineComponent } from "vue";

export default defineComponent({
  props: {
    /** Svg图标名称 */
    name: {
      type: String,
      default: "",
    },
    /** Svg颜色 */
    color: {
      type: String,
      default: "",
    },
    /** Svg大小 */
    size: {
      type: [Number, String],
      default: 16,
    },
    width: {
      type: [Number, String],
      default: null,
    },
    height: {
      type: [Number, String],
      default: null,
    },
  },
  setup(props) {
    return () => (
      <svg style={`color:${ props.color };width:${ props.width ? props.width : props.size }px;height:${ props.height ? props.height : props.size }px;fill:currentColor;vertical-align:middle;`}>
        <use xlinkHref={`#icon-${ props.name }`}></use>
      </svg>
    );
  },
});
