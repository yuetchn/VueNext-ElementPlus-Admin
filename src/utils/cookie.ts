/*
 * @ModuleName: Cookies
 * @Author: 乐涛
 * @LastEditTime: 2022-01-12 11:49:03
 */
import Cookie from "js-cookie";

const token_key = "pro_token";

// token
export const SetToken = (value: string): string | undefined => Cookie.set(token_key, value);
export const GetToken = (): string | undefined => Cookie.get(token_key);
export const RemoveToken = (): void => Cookie.remove(token_key);
