/*
 * @ModuleName: 请求封装
 * @Author: 乐涛
 * @LastEditTime: 2022-01-14 15:05:23
 */
import axios from "axios";
import { message } from "ant-design-vue";
import { GetToken } from "@/utils/cookie";
import { store } from "@/store";

const timeout = 1000 * 30;
const req = axios.create({
  baseURL: import.meta.env.VITE_BASE_HOST,
  timeout,
  timeoutErrorMessage: "连接超时",
});

// 请求队列
let queue = 0;
const ShowLoading = ((info: string) => {
  let time: any = 0;
  return () => {
    const nowTime = new Date().getTime();
    queue++;
    if (nowTime - time > 200) {
      time = nowTime;
      store.dispatch("AppModule/set_loadingShade", true);
      message.loading({
        content: info,
        duration: timeout,
      });
    }
  };
})("加载中");

const HiddenLoading = (isForce = false) => {
  isForce ? (queue = 0) : queue--;
  if (queue) {
    return;
  }
  store.dispatch("AppModule/set_loadingShade", false);
  message.destroy();
};

req.interceptors.request.use(
  (config) => {
    ShowLoading();
    // headers
    const headers: { [key: string]: any } = {};

    if (GetToken()) {
      headers["X-Access-Token"] = GetToken() as string;
    }

    config.headers = headers;
    config.data = JSON.stringify(config.data);
    return config;
  },
  (err) => Promise.reject(err),
);

req.interceptors.response.use(
  (response) => {
    HiddenLoading();
    const data = response.data;
    if (response.status === 200 && data.code !== 200) {
      switch (data.code) {
        case 401:
          message.warning("会话超时");
          setTimeout(() => {
            store.dispatch("UserModule/loginOut");
          }, 1000);

          break;
        default:
          message.error(data.info);
          break;
      }
    }

    return response;
  },
  (err) => {
    HiddenLoading(true);
    message.error("连接失败");
    return Promise.reject(err);
  },
);

/**
 * Http Get Request
 * @param url
 * @param params
 * @returns
 */
const Get = (url: string, params?: any) => req({
  url,
  method: "GET",
  params,
});

/**
 * Http Post Request
 * @param url
 * @param data
 * @returns
 */
const Post = (url: string, data?: any) => req({
  url,
  method: "POST",
  data,
});

export default {
  Get,
  Post,
};
