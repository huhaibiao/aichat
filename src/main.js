/***
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-03-28 15:00:05
 * @Description:
 */
import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
app.mount('#app')
window.hhh_API_key = hhh_API_key
window.__APP_ENV__ = __APP_ENV__
console.log(window.__APP_ENV__, __APP_ENV__ === 'development' && window.hhh_API_key)
