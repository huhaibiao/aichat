<script setup lang="ts" name="DownLoadChatsList">
import { getLocalStorage } from './utils'

function downloadFile(fileName, content) {
  const aLink = document.createElement('a')
  const blob = new Blob([content])
  const evt = document.createEvent('MouseEvents')
  evt.initEvent('click', false, false) //initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
  aLink.download = fileName
  aLink.href = URL.createObjectURL(blob)
//   aLink.type = type || 'html'
  aLink.type = 'log'
  aLink.dispatchEvent(evt)
  if (navigator.userAgent.indexOf('Firefox') >= 0) aLink.click() //FF的支持,可能不需要
}

const historyList = getLocalStorage()

const exportList = params => {
  downloadFile('ai-history', JSON.stringify(historyList))
}
</script>

<template>
  <el-button type="primary" plain @click="exportList">导出所有对话</el-button>
</template>
