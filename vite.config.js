/***
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-03-28 15:03:25
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { splitVendorChunkPlugin } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { confirmCommit, getBranch, updatePkg } from './hooks/index'
import dotenv from 'dotenv'
dotenv.config()

//打包一次版本加一
const preBuild = async () => {
  getBranch()
  return confirmCommit().then(res => {
    if (res) {
      const pkgObject = updatePkg()
      return pkgObject.name + ` v${pkgObject.version}`
    }
    return 'dist'
  })
}

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  let outDir = 'dist'
  if (command === 'serve') {
  } else {
    outDir = await preBuild()
  }
  // const base = '/aichat/'
  const base = './'
  return {
    plugins: [
      vue(),
      splitVendorChunkPlugin(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
      // AutoImport({
      //   // Auto import functions from Vue, e.g. ref, reactive, toRef...
      //   // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      //   imports: ['vue'],

      //   // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      //   // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      //   resolvers: [
      //     ElementPlusResolver(),

      //     // Auto import icon components
      //     // 自动导入图标组件
      //     IconsResolver({
      //       prefix: 'Icon'
      //     })
      //   ],
      //   dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      // }),

      // Components({
      //   resolvers: [
      //     // Auto register icon components
      //     // 自动注册图标组件
      //     IconsResolver({
      //       enabledCollections: ['ep']
      //     }),
      //     // Auto register Element Plus components
      //     // 自动导入 Element Plus 组件
      //     ElementPlusResolver()
      //   ],

      //   dts: path.resolve(pathSrc, 'components.d.ts')
      // }),

      // Icons({
      //   autoInstall: true
      // })
    ],
    base,
    server: {
      open: true,
      host: '0.0.0.0',
      port: 5174
      // proxy: {
      //   '/v1/chat': 'http://127.0.0.1:7890'
      // }
    },
    build: {
      outDir: outDir
    },
    define: {
      __APP_ENV__: JSON.stringify(mode),
      hhh_API_key: JSON.stringify(process.env.OPENAI_API_KEY)
    }
  }
})
