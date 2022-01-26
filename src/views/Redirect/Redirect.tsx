/*
 * @ModuleName: Redirect
 * @Author: 乐涛
 * @LastEditTime: 2022-01-26 09:16:25
 */
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const { path } = route.params;
    if (path) {
      router.replace({ path: `/${ path }`, query: route.query });
    }

    return () => {}
  },
});
