/*
 * @ModuleName: Mock Server
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 16:42:00
 */
import Mock from "mockjs";

const mocks = import.meta.globEager("./**/*.ts");
console.log(mocks);
Object.keys(mocks).forEach((m) => {
  const module = m.replace(/^.\//, "").replace(/\/.*/, "")
    
  Object.keys(mocks[m]).forEach(f => {
    Mock.mock(`${ import.meta.env.VITE_BASE_HOST + module }/${ f }`, mocks[m][f])
  })
});
export default Mock;
