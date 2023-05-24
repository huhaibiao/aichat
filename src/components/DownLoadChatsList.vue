<!--
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-04 20:21:05
 * @Description: 
-->
<script setup lang="ts" name="DownLoadChatsList">
import { getLocalStorage } from '../utils'

function downloadFile(fileName, content) {
  const aLink = document.createElement('a')
  const blob = new Blob([content])
  const url = URL.createObjectURL(blob)
  aLink.href = url
  aLink.download = fileName + '.json'
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
  URL.revokeObjectURL(url)
}

const exportList = params => {
  const historyList = getLocalStorage()
  downloadFile('ai-chat-history', JSON.stringify(historyList))
}
</script>

<template>
  <el-button type="primary" plain @click="exportList">导出所有对话</el-button>
</template>
