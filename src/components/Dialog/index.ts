/*
 * @ModuleName: Dialog Drag
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-04-30 09:01:21
 */

let dialogHeader: HTMLDivElement | null = null;
let dialogRoot: HTMLDivElement | null = null;
let cX = 0;
let cY = 0;
const down = (e: MouseEvent) => {
  if (dialogHeader && typeof dialogHeader.onselectstart != "undefined") {
    dialogHeader.onselectstart = () => false
  }
  if (dialogRoot) {
    cX = e.clientX - dialogRoot.offsetLeft;
    cY = e.clientY - dialogRoot.offsetTop;
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }
};

const up = () => {
  document.removeEventListener("mousemove", move);
  document.removeEventListener("mouseup", up);
};

const move = (e: MouseEvent) => {
  if (dialogRoot) {
    // 留个坑,此处未做拖拽超出范围限制,且更新版本后拖拽定位有点问题，暂时没时间处理
    // if (e.clientX - cX <= 0 || e.clientX - cX >= document.body.clientWidth || e.clientY - cY <= 0 || e.clientY - cY >= document.body.clientHeight) {
    //   return;
    // }
    dialogRoot.style.left = `${ e.clientX - cX }px`;
    dialogRoot.style.top = `${ e.clientY - cY }px`;
  }
};
const init = (el:any, dialogClassName: string, className: string) => {
  dialogHeader = el.querySelector(`.${ className }`);
  dialogRoot = el.querySelector(`.${ dialogClassName }`);

  if (dialogRoot) {
    dialogRoot.style.left = `${ (document.body.clientWidth - dialogRoot.clientWidth) / 2 }px`;
  }
  if (dialogHeader) {
    dialogHeader.style.cursor = "move";
    dialogHeader.addEventListener("mousedown", down);

    if (typeof dialogHeader.onselectstart != "undefined") {
      dialogHeader.onselectstart = () => true
    }
  }
};

export default init;
