/*
 * @ModuleName:
 * @Author: 乐涛
 * @LastEditTime: 2022-01-13 15:08:18
 */
import { createVNode, render } from "vue";
import Message from "./Message";

export const CreateMessage = () => {
  const vNode = createVNode(Message);
  render(vNode, document.body);
};
