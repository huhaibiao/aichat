/*
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-03-29 16:04:22
 * @Description: 
 */
import { Axios } from 'axios'

declare global {
  interface Window {
    axios: Axios
    __APP_ENV__: any
    hhh_API_key: String
  }
}
