import axios from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: 'http://gptapi.jnnxtech.com'
})

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 对响应错误做点什么
    errorHandler(error)
    return Promise.reject(error)
  }
)

/** 其他错误码处理 */
function errorHandler(err) {
  //   if (err.response && err.response.status === 401) {
  //     MessageBox.alert('您当前的登录状态已失效，请重新登录！', '登录状态失效', {
  //       type: 'warning',
  //       callback: action => {
  //         router.push({
  //           path: '/login'
  //         })
  //       }
  //     })
  //     return
  //   }
  ElMessage({
    type: 'error',
    message: '服务异常: ' + err?.response?.status
  })
  return Promise.reject(err)
}

export const server = instance

window.axios = instance
