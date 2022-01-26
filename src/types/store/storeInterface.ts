/*
 * @ModuleName: Store 注解
 * @Author: 乐涛
 * @LastEditTime: 2022-01-26 09:59:18
 */
import { UserStates } from "@/store/modules/user";
import { AppStates } from "@/store/modules/app";
import { ViewTagStates } from "@/store/modules/viewTag";

export default interface RootStates {
  app: string;
}

export interface AllStates extends RootStates {
  UserModule: UserStates;
  AppModule: AppStates;
  ViewTagModule: ViewTagStates;
}
