/*
 * @ModuleName: Login
 * @Author: 乐涛
 * @LastEditTime: 2022-01-23 12:49:25
 */

export const login = (data: any) => {
  const body = JSON.parse(data.body);
  return {
    code: 200,
    info: "登录成功",
    data: body.account,
  };
};
