/*
 * @ModuleName: IconSelect
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-25 13:35:42
 */
import { defineComponent } from "vue";
import style from "./IconSelect.module.scss";
import { iconSelectEmits } from "./options"

export default defineComponent({
  emits: iconSelectEmits,
  setup(_, { emit }) {
    const icons = Object.keys(import.meta.glob("../../../assets/icons/**/*.svg")).map((f) => f
    .replace(/^.*\/icons\//, "")
    .replace(/\//, "-")
    .replace(/.svg/, ""));
      
    const change = (name:string) => {
      emit("change", name)
    }

    const icon_template = () => (
      <div class={style["g-icon-select"]}>
        {icons.map((m) => (
          <div onClick={ () => change(m) } class={style["icon-template-body"]}>
            <g-svg-icon name={m} />
          </div>
        ))} 
      </div>
    );
    return () => (
      icon_template()
    );
  },
});
