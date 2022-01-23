/*
 * @ModuleName: User
 * @Author: 乐涛
 * @LastEditTime: 2022-01-21 17:29:41
 */

import { mock } from "mockjs";

export const getUserData = () => mock({
  code: 200,
  "data|50": [
    {
      id: "@increment(1)",
      name: "@name()",
      address: "@region()",
      email: "@email()",
      status: "@pick([{type:'danger',label:'异常'},{type:'success',label:'正常'},{type:'warning',label:'质疑'},{type:'info',label:'未知'}])",
    },
  ],
  info: "操作成功",
  total: 50,
});
