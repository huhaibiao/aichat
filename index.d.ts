import { Axios } from 'axios'

declare global {
  interface Window {
    axios: Axios
    __APP_ENV__: any
  }
}
