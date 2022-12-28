/*
 * @ModuleName: Clipboard
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-10-26 15:33:42
 */

/** 写入剪切板 */
export const ClipboardFunc = (data: string) => {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(data);
  }
  
  const textDom = document.createElement("textarea");
  textDom.innerText = data;
  textDom.style.zIndex = "0";
  textDom.style.top = "-999999px";
  textDom.style.left = "-999999px";
  textDom.style.position = "absolute";
  document.body.appendChild(textDom);
  textDom.select();
  const copyResult = document.execCommand("copy");
  setTimeout(() => {
    document.body.removeChild(textDom);
  }, 100);
  return copyResult ? Promise.resolve() : Promise.reject();
};