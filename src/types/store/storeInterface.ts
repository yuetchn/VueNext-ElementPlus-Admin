/*
 * @ModuleName: Store 注解
 * @Author: 乐涛
 * @LastEditTime: 2022-01-12 11:16:24
 */
import { UserStates } from "@/store/modules/user";
import { AppStates } from "@/store/modules/app";

export default interface RootStates {
  app: string;
}

export interface AllStates extends RootStates {
  UserModule: UserStates;
  AppModule: AppStates;
}
