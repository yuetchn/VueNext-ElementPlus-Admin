/*
 * @ModuleName: Vite Config
 * @Author: yuetchn@163.com
 * @LastEditTime: 2022-10-25 15:42:07
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { VitePWA } from "vite-plugin-pwa"
import path from "path"

const timeStamp = new Date().valueOf();

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  base: loadEnv(mode, process.cwd()).VITE_BASE_PUBLIC_PATH,
  publicDir: "./public",
  assetsInclude: [
    "**/*.svg",
  ],
  plugins: [
    vue(),
    legacy({
      targets: ["defaults", "not IE 11", "chrome 61"],
    }),
    vueJsx(),
    createSvgIconsPlugin({
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
      "/v1/": {
        // 如果本地没有环境启动后台服务，可使用提供的生产预览环境：http://106.12.115.85:8989/
        target: "http://localhost:8989",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/v1\//, "v1"),
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src/",
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
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
    reportCompressedSize: false,
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
        entryFileNames: `enteryJs/e_[name]_[hash].${ timeStamp }.js`,
        chunkFileNames: `chunkJs/c_[name]_[hash].${ timeStamp }.js`,
        assetFileNames: `assets/f_[name]_[hash].${ timeStamp }.[ext]`,
      },
    },
  },
});