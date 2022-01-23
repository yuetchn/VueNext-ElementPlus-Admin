/*
 * @ModuleName: Mock Server
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 14:21:12
 */
import Mock from "mockjs";

if (import.meta.env.MODE === "development") {
  const mocks = import.meta.globEager("./**/*.ts");
  Object.keys(mocks).forEach((m) => {
    const module = m.replace(/^.\//, "").replace(/\/.*/, "")

    Object.keys(mocks[m]).forEach(f => {
      Mock.mock(`${ import.meta.env.VITE_BASE_HOST + module }/${ f }`, mocks[m][f])
    })
  });
}
export default Mock;