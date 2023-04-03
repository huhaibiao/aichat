/*** 
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-03-28 15:03:25
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { confirmCommit, getBranch, updatePkg } from './hooks/index';
import dotenv from 'dotenv';
dotenv.config();

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
export default defineConfig(
  async ({ command, mode }) => {
    let outDir = 'dist'
    if (command === 'serve') {

    } else {
      outDir = await preBuild()
    }
    // const base = '/aichat/'
    const base = './'
    return {
      plugins: [vue()],
      base,
      server: {
        open: true,
        host: '0.0.0.0',
        port: 5174,
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
  }
)
