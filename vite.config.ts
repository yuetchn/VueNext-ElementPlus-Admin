/*
 * @ModuleName: Vite Config
 * @Author: 乐涛
 * @LastEditTime: 2022-01-24 16:17:27
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteSvgIcons from "vite-plugin-svg-icons";
import path from "path";

const timeStamp = new Date().valueOf();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    vueJsx(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹，地址可改
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  server: {
    host: "localhost",
    port: 85,
    strictPort: false,
    proxy: {
      // "/api/": {
      //   target: config.VITE_BASE_HOST,
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api\//, ""),
      // },
    },
  },
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@use \"@/assets/style/global.scss\" as *;",
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
    // sourcemap: true,
    rollupOptions: {
      plugins: [],
      output: {
        entryFileNames: `enteryJs/e_[name].${ timeStamp }.js`,
        chunkFileNames: `chunkJs/c_[name].${ timeStamp }.js`,
        assetFileNames: `assets/f_[name].${ timeStamp }.[ext]`,
      },
    },
  },
});
