/*
 * @ModuleName: Request
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-07-21 11:05:58
 */
import axios, { AxiosRequestConfig } from "axios";
import { message } from "ant-design-vue";
import { GetToken } from "@/utils/cookie";
import store from "@/store";

const timeout = 1000
  * import.meta.env.VITE_HTTP_REQUEST_TIME_OUT;
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
    const headers: Record < string, string > = {
      "Accept-Language": (store.state as any).AppModule.locale,
    };

    if (GetToken()) {
      headers.Authorization = GetToken() as string;
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
      /// Response Server Code
      /// 2xx - Success
      /// 3xx - Redirect
      /// 4xx - Error
      /// 5xx - Server Error
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
  (err:any) => {
    HiddenLoading(true);
    switch (err.response.status) {
      case 401:
        message.warning("会话超时");
        setTimeout(() => {
          store.dispatch("UserModule/loginOut");
        }, 1000);
        break;
    
      default:
        message.error(err.response.data?.msg || "连接失败");   
        break;
    }
    return Promise.reject(err);
  },
);

/**
 * Http Get Request
 * @param url
 * @param params
 * @returns
 */
const Get = < D = any > (url: string, params ? : any, options ? : AxiosRequestConfig) => req < D >({
  url,
  method: "GET",
  params,
  ...options,
});

/**
 * Http Post Request
 * @param url
 * @param data
 * @returns
 */
const Post = < D = any >(url: string, data ? : any, options ? : AxiosRequestConfig) => req < D >({
  url,
  method: "POST",
  data,
  ...options,
});

/**
 * Http Delete Request
 * @param url
 * @param data
 * @returns
 */
const Delete = < D = any >(url: string, params ? : any, options ? : AxiosRequestConfig) => req < D >({
  url,
  method: "DELETE",
  params,
  ...options,
});

/**
 * Http Put Request
 * @param url
 * @param data
 * @returns
 */
const Put = < D = any >(url: string, data ? : any, options ? : AxiosRequestConfig) => req < D >({
  url,
  method: "PUT",
  data,
  ...options,
});

export default {
  Get,
  Post,
  Put,
  Delete,
  Request: req,
};