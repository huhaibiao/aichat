/*
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-04 21:56:01
 */
import axios from 'axios'
import { getLocalStorage, saveLocalStorage } from '../components/utils'

const historyList = getLocalStorage()
const x = historyList.findIndex(item => {
  return item == null
})

console.log('🚀 ~ file: websocketChat.js:20 ~ x ~ x:', x, historyList.length)
if (x > 0) {
  historyList.splice(x - 1, 2)
  saveLocalStorage(historyList)
}
let tmp = [{ role: 'system', content: 'You are a professional front end assistant.' }]
historyList.forEach((item, index) => {
  tmp = [...tmp, { role: 'user', content: item.question }, { role: 'assistant', content: item.rep }]
})
export const chatTmpList: unknown[] = []

export const postOpenAi = request => {
  console.log('🚀 ~ file: index.js:26 ~ postOpenAi ~ request:', request, 'time:' + new Date().toLocaleTimeString())
  let messages = JSON.parse(JSON.stringify(tmp))
  chatTmpList.forEach((item: any, index) => {
    messages = [...messages, { role: 'user', content: item.question }, { role: 'assistant', content: item.rep }]
  })
  messages.push({ role: 'user', content: request })
  const l = messages.length
  if (l >= 7) {
    messages.splice(1, l - 4)
  }
  return axios
    .post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0301',
        messages,
        temperature: 0.6,
        n: 1,
        user: 'user'
        // stream: true
      },
      {
        headers: {
          Authorization: `Bearer ${window.hhh_API_key.slice(0, -2).slice(2)}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false
        // responseType: 'stream',
      }
    )
    .then(response => {
      let data = response.data
      if (typeof data === 'string') {
        data = JSON.parse(response.data)
      }
      console.log('🚀 ~ file: websocketChat.js:38 ~ postOpenAi ~ response:', typeof data, data)
      const rep = data.choices[0]?.message?.content
      messages.push({ role: 'assistant', content: rep })
      return rep
    })
    .catch(er => {
      const errData = er?.message
      console.log('🚀 ~ file: index.js:75 ~ postOpenAi ~ er:', er)
      console.log('post api请求出错')
      // Promise.reject(errData)
      throw new Error(er)
    })
}