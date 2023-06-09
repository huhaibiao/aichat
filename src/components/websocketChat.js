/*
 * @Author: huhaibiao
 * @Date: 2023-04-04 20:21:05
 */
let IN_WS_URL = 'ws://18.216.251.165:8088'
// __APP_ENV__ && (IN_WS_URL = 'ws://192.168.124.7:8088/')
if (location?.protocol.includes('https')) {
  IN_WS_URL = 'wss' + IN_WS_URL.slice(2)
}

const codeList = [0, 2599]

export const params = {
  appId: 'sfggffeefegrgrfrfe',
  sessionId: 'qdsfsfdgdfgddddqoqd'
}

/** ws的事件监听 */
export const handleFns = {
  mesHandle(event) {
    // console.log("Received message from server: " + event.data);
  },
  closeHandle(event) {
    // console.log("WebSocket closed with code " + event.code + " and reason " + event.reason + 'time:' + new Date().toLocaleTimeString());
  },
  openHandle(event) {
    console.log(
      'time:' + new Date().toLocaleTimeString() + '🚀 ~ file: websocketChat.js:20 ~ openHandle ~ event:',
      event
    )
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
