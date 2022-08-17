/*
 * @ModuleName: Mock Server
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-08-06 13:12:09
 */
import Mock from "mockjs";

if (import.meta.env.MODE === "development") {
  const mocks = import.meta.globEager<string, any>("./**/*.ts");
  Object.keys(mocks).forEach((m) => {
    const module = m.replace(/^.\//, "").replace(/\/.*/, "")

    Object.keys(mocks[m]).forEach(f => {
      Mock.mock(RegExp(`${ import.meta.env.VITE_BASE_HOST + module }/${ f }.*`), mocks[m][f])
    })
  });
}
export default Mock;