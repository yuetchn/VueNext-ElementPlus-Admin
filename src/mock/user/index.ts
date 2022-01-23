/*
 * @ModuleName: User
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 13:43:15
 */

import { mock } from "mockjs";

export const getUserData = (data: any) => {
  const body = JSON.parse(data.body)
  return mock({
    code: 200,
    [`data|${ body.pageSize }`]: [{
      id: [`@integer(${ body.pageSize * body.pageNumber },10000)`],
      name: "@name()",
      address: "@region()",
      email: "@email()",
      status: "@pick([{type:'danger',label:'异常'},{type:'success',label:'正常'},{type:'warning',label:'质疑'},{type:'info',label:'未知'}])",
    }],
    info: "操作成功",
    total: 10000,
  })
};

export const getUserInfo = () => ({
  code: 200,
  info: "操作成功",
  data: {
    userName: "Demo",
    avatar: "http://www.baidu.com",
    menu: [

    ],
  },
})