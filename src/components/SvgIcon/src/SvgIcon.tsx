import { defineComponent } from "vue";
import { svgIconProps } from "./options";

export default defineComponent({
  props: svgIconProps,
  setup(props) {
    return () => (
      <svg style={`color:${ props.color };width:${ props.width ? props.width : props.size }px;height:${ props.height ? props.height : props.size }px;fill:currentColor;vertical-align:middle;`}>
        <use xlinkHref={`#icon-${ props.name }`}></use>
      </svg>
    );
  },
});
