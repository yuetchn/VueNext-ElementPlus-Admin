import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
      default: "module",
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
        <use xlink:href={`#icon-${ props.name }`}></use>
      </svg>
    );
  },
});
