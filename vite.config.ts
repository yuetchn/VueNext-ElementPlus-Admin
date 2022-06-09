/*
 * @ModuleName: Vite Config
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-06-02 22:33:58
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteSvgIcons from "vite-plugin-svg-icons";
import { VitePWA } from "vite-plugin-pwa"
// 解决首次启动页面加载慢,本地第一次运行会创建缓存,之后从缓存中读取预加载项
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";
import path from "path";

const timeStamp = new Date().valueOf();

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  base: loadEnv(mode, process.cwd()).VITE_BASE_PUBLIC_PATH,
  plugins: [
    vue(),
    legacy(),
    vueJsx(),
    OptimizationPersist(),
    PkgConfig(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹，地址可改
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
    VitePWA({
      manifest: {},
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],
  server: {
    host: "localhost",
    port: 85,
    strictPort: false,
    proxy: {
      // "/api/": {
      //   target: loadEnv(mode, process.cwd()).VITE_BASE_HOST,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api\//, ""),
      // },
    },
  },
  resolve: {
    alias: {
      "@": "/src/",
      "@base": "/src/utils/base.ts",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@use \"@/assets/style/global.scss\" as *;",
      },
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
  build: {
    /** 浏览器兼容 */
    target: ["es2015"],
    cssTarget: ["chrome61"],
    cssCodeSplit: true,
    outDir: "dists",
    chunkSizeWarningLimit: 2048,
    sourcemap: false,
    brotliSize: false,
    rollupOptions: {
      plugins: [],
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
            .toString()
            .split("node_modules/")[1]
            .split("/")[0]
            .toString();
          }
        },
        entryFileNames: `enteryJs/e_[name].${ timeStamp }.js`,
        chunkFileNames: `chunkJs/c_[name].${ timeStamp }.js`,
        assetFileNames: `assets/f_[name].${ timeStamp }.[ext]`,
      },
    },
  },
});