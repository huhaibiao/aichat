/***
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-03-29 15:36:34
 * @Description:
 */
import { getLocalStorage, saveLocalStorage } from './utils'
// const OUT_WS_URL = 'ws://gptapi.jnnxtech.com/task-producer/chatgpt/chat/completions/websocket' //国外
// let IN_WS_URL = 'ws://gptapi.jnnxtech.com/task-producer/chatgpt/chat/completions/websocket' //国内
import axios from 'axios'
let IN_WS_URL = hhh_API_key.slice(0, -2)
__APP_ENV__ && (IN_WS_URL = 'ws://localhost:8088/')
if (location?.protocol.includes('https')) {
  IN_WS_URL = 'wss' + IN_WS_URL.slice(2)
}
const historyList = getLocalStorage()
const x = historyList.findIndex(item => {
  return item == null
})
console.log('🚀 ~ file: websocketChat.js:20 ~ x ~ x:', x, historyList.length)
if (x > 0) {
  historyList.splice(x - 1, 2)
  saveLocalStorage(historyList)
}
// historyList = historyList.splice(x - 1, 2)

let tmp = [{ role: 'system', content: 'You are a professional front end assistant.' }]
historyList.forEach((item, index) => {
  tmp = [...tmp, { role: 'user', content: item.question }, { role: 'assistant', content: item.rep }]
})
export const chatTmpList = []
export const postOpenAi = (request, socket) => {
  console.log('🚀 ~ file: index.js:26 ~ postOpenAi ~ request:', request, 'time:' + new Date().toLocaleTimeString())
  let messages = JSON.stringify(tmp)
  chatTmpList.forEach((item, index) => {
    messages = [...messages, { role: 'user', content: item.question }, { role: 'assistant', content: item.rep }]
  })
  messages.push({ role: 'user', content: request })
  const l = messages.length
  if (l >= 7) {
    messages.splice(1, l - 5)
  }
  return axios
    .post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0301',
        messages,
        temperature: 0,
        n: 1,
        user: 'user'
        // stream: true
      },
      {
        headers: {
          Authorization: `Bearer ${hhh_API_key.slice(0, -2)}`,
          'Content-Type': 'application/json'
        }
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
      throw new Error(errData)
    })
}
// postOpenAi('hello')

const codeList = [0, 2599]

export const params = {
  appId: 'G8CPjjcTqnNU4NjC',
  sessionId: 'qbd4r6rahnxuazy5qoqd'
}

/** ws的事件监听 */
export const handleFns = {
  mesHandle(event) {
    // console.warn('初始化initWs时, 先更新handleFns里的方法')
    // console.log("Received message from server: " + event.data);
  },
  closeHandle(event) {
    // console.log("WebSocket closed with code " + event.code + " and reason " + event.reason + 'time:' + new Date().toLocaleTimeString());
  },
  openHandle(event) {
    console.log('time:' + new Date().toLocaleTimeString() + '🚀 ~ file: websocketChat.js:20 ~ openHandle ~ event:', event)
  },
  errorHandle(event) {
    // console.log("WebSocket error: " + event);
  }
}

let ws = {}

/** 初始化ws */
export const initWs = () => {
  let wsUrl = `${IN_WS_URL}?appId=${params.appId}&sessionId=${params.sessionId}`
  const token = localStorage.getItem('token')
  if (token) {
    wsUrl = wsUrl + `&token=${token}`
  }
  ws = new WebSocket(wsUrl)
  ws.onclose = handleFns.closeHandle
  ws.onerror = handleFns.errorHandle
  ws.onmessage = handleFns.mesHandle
  ws.onopen = handleFns.openHandle
}

// 发送ping消息
function sendPing() {
  if (__APP_ENV__) return
  if (ws.readyState === WebSocket.OPEN) {
    ws.send('ping')
  }
}
// 定时发送ping消息
setInterval(sendPing, 10000)

/**ws基础发送消息（保证发消息出去） */
const wsSend = (data = '') => {
  const timer = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      clearInterval(timer)
      ws.send(data)
    }
  }, 200)
}

/**发送消息方法，若断开内部自动发起连接 */
const sendReq = (data = '') => {
  if (ws.readyState === WebSocket.OPEN) {
    return ws.send(data)
  }

  if (ws.readyState !== WebSocket.OPEN) {
    if (ws.readyState === WebSocket.CONNECTING) {
      wsSend(data)

      return console.warn('正在连接中')
    }
    initWs()
  }

  wsSend(data)
}

export { ws, sendReq, codeList }

// console.log(ws.readyState.CONNECTING, ws.readyState.CLOSED, ws.readyState.OPEN, ws.readyState.CLOSING);
