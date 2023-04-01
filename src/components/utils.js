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


/**
 * token不存在的话重新登录
 * token存在，但时间过期了，登录
 */
export const JLogin = () => {
    if (!localStorage.getItem('token')) return true

    const saveTokenTime = JSON.parse(localStorage.getItem('saveTokenTime'))
    const exp = JSON.parse(localStorage.getItem('expiresIn'))
    if ((new Date().getTime() / 1000 - saveTokenTime) > exp) return true

    return false
}
