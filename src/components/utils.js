/***
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-03-27 16:59:34
 * @Description:
 */

/**
 *
 * @param {number} timeNumber 时间戳
 * @returns 对应的时间文案
 */
export const formatCommentTime = timeNumber => {
  const nowTimeNumber = new Date().getTime()
  const nowYear = new Date(nowTimeNumber).getFullYear()
  const commentYear = new Date(timeNumber).getFullYear()

  if (nowYear > commentYear) {
    return
  }
  let diff = (nowTimeNumber - timeNumber) / 1000 // 差秒
  if (diff <= 60) {
    return '刚刚'
  }
  diff /= 60 // 分钟
  if (diff < 60) {
    return `${Math.floor(diff)}分钟前`
  }
  diff /= 60 // 小时
  if (diff < 24) {
    return `${Math.floor(diff)}小时前`
  }

  return dayjs(timeNumber).format('MM-DD')
}

/**判断缓存的数据是否大于本地存储 */
export const bytesJudge = jsjson => {
  const userAgent = navigator.userAgent
  const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor)
  const isFirefox = /Firefox/.test(userAgent)
  const isIE = /Trident/.test(userAgent)
  const isEdge = /Edge/.test(userAgent)
  const isSafari = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor)

  //@ts-ignore
  const n = isChrome * 5 + isFirefox * 10 + isIE * 10 + isEdge * 10 + isSafari * 5 || 5
  let localStorageLimit = 1024 * 1024 * n * 0.9 // 5MB
  const jsonByteLength = new Blob([jsjson]).size // 计算 JSON 字符串的字节数
  // console.log('🚀 ~ file: ChatComponent.vue:50 ~ bytesJudge ~ jsonByteLength:', jsonByteLength, 'b', jsonByteLength / 1024, 'kb')

  return jsonByteLength > localStorageLimit
}

export const saveLocalLoginSuccess = (token, curTime, exp) => {
  localStorage.setItem('token', token)
  localStorage.setItem('saveTokenTime', JSON.stringify(curTime))
  localStorage.setItem('expiresIn', JSON.stringify(exp))
}
let saveKey, localList
/** 获取本地存储对话数据 */
export const getLocalStorage = () => {
  // const key = saveKey ?? 'chat-list'
  const key = 'chatsList'
  localList = localStorage.getItem(key)
  return localList === null ? [] : JSON.parse(localList)
}

/**本地存储对话数据 */
export const saveLocalStorage = (params = [], key = 'chat-list') => {
  deletedChatData(params)
  // const key = 'chat-list'
  saveKey = key
  try {
    localStorage.setItem(key, JSON.stringify(params))
  } catch (error) {
    console.error('本地存储数据时出错：', error)
  }
}

/** 去掉最早的历史对话数据 2个2个去掉循环判断是否有剩余数据可以存储了*/
const deletedChatData = (params = []) => {
  const jsonString = JSON.stringify(params)
  if (bytesJudge(jsonString)) {
    params.shift()
    params.shift()
    if (bytesJudge(JSON.stringify(params))) {
      deletedChatData(params)
    }
  } else {
    return
  }
}
/**
 * token不存在的话重新登录
 * token存在，但时间过期了，登录
 */
export const JLogin = () => {
  if (!localStorage.getItem('token')) return true

  const saveTokenTime = JSON.parse(localStorage.getItem('saveTokenTime'))
  const exp = JSON.parse(localStorage.getItem('expiresIn'))
  if (new Date().getTime() / 1000 - saveTokenTime > exp) return true

  return false
}

/**
 * 移动端触摸滑动功能
 */
export const touchSwiper = (element, callback) => {
  let startX, startY

  element.addEventListener('touchstart', function (event) {
    startX = event.touches[0].clientX
    startY = event.touches[0].clientY
  })

  element.addEventListener('touchmove', function (event) {
    const deltaX = event.touches[0].clientX - startX
    const deltaY = event.touches[0].clientY - startY

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 横向滑动
      if (deltaX < -80) {
        // 向左滑动
        console.log('向左滑动')
        callback()
      } else {
        // 向右滑动
        console.log('向右滑动')
      }
    } else {
      // 纵向滑动
      if (deltaY < 0) {
        // 向上滑动
        console.log('向上滑动')
      } else {
        // 向下滑动
        console.log('向下滑动')
      }
    }
  })

  element.addEventListener('touchend', function (event) {
    startX = null
    startY = null
  })
}

/**设备，移动还是pc */
export function isMobile() {
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = ['android', 'iphone', 'ipod', 'ipad', 'windows phone', 'blackberry', 'mobile']
  for (let i = 0; i < mobileKeywords.length; i++) {
    if (userAgent.indexOf(mobileKeywords[i]) !== -1) {
      return true
    }
  }
  return false
}

/**选择中右键 右键菜单*/
export const mouseRightClick = (dom, callback) => {
  dom.addEventListener('contextmenu', function (event) {
    console.log("🚀 ~ file: utils.js:165 ~ event:", event.target)
    console.log(window.getSelection().toString())
    // event.preventDefault() // 阻止默认右键菜单
    callback()
  })
}

