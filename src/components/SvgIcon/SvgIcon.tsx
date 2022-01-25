import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    size: {
      type: [Number, String],
      default: 16,
    },
  },
  setup(props) {
    return () => (
      <svg style={`color:${ props.color };width:${ props.size }px;height:${ props.size }px;fill:currentColor;vertical-align:middle;`}>
        <use xlinkHref={`#icon-${ props.name }`}></use>
      </svg>
    );
  },
});