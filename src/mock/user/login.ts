/*
 * @ModuleName: Login
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-09 11:53:47
 */

export const login = (data: any) => {
  const body = JSON.parse(data.body);
  return {
    code: 200,
    info: "登录成功",
    data: body.account,
  };
};
