/*
 * @ModuleName: 请求封装
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-05-05 19:19:51
 */
import axios, { AxiosRequestConfig } from "axios";
import { message } from "ant-design-vue";
import { GetToken } from "@/utils/cookie";
import store from "@/store";

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
    const headers: Record<string, string> = {
      "Accept-Language": (store.state as any).AppModule.locale,
    };

    if (GetToken()) {
      headers["X-Access-Token"] = GetToken() as string;
    }

    config.headers = { ...config.headers, ...headers }
    return config;
  },
  (err) => Promise.reject(err),
);

req.interceptors.response.use(
  (response) => {
    HiddenLoading();
    const data = response.data;
    if (response.status === 200 && data.code !== 200) {
      /// 根据业务结合后端在不同状态码执行不同操作
      /// 2xx - 成功
      /// 3xx - 重定向
      /// 4xx - 错误
      /// 5xx - 服务异常
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
const Get = (url: string, params?: any, options?:AxiosRequestConfig) => req({
  url,
  method: "GET",
  params: params && JSON.stringify(params),
  ...options,
});

/**
 * Http Post Request
 * @param url
 * @param data
 * @returns
 */
const Post = (url: string, data?: any, options?:AxiosRequestConfig) => req({
  url,
  method: "POST",
  data: data && JSON.stringify(data),
  ...options,
});

export default {
  Get,
  Post,
  Request: req,
};
