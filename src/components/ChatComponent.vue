<script lang="ts" setup>
import RepLoading from './Loading.vue'
import { ws, sendReq, handleFns, initWs, params, postOpenAi, chatTmpList } from './websocketChat'
import { bytesJudge, getLocalStorage, saveLocalStorage } from './utils'
import { onBeforeUnmount, onBeforeMount, onUnmounted, Ref, ref, onMounted, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { ElMessage } from 'element-plus'
import { pendingCount, useActionRequest } from './useRequest'
const emit = defineEmits(['JLogin'])
emit('JLogin')

/**设置用户唯一sessionId */
const sessionId = localStorage.getItem('sessionId')
if (sessionId) {
  params.sessionId = sessionId
} else {
  params.sessionId = uuidv4()
  localStorage.setItem('sessionId', params.sessionId)
}

const textarea = ref('')
/** 对话状态： 包括 0空闲中，1发送中和等待回复中，2回复中，0回复结束 */
let STATUS = ref(0)
let chatList = ref<string[]>([])
const chatsList = reactive<any[]>([])

const scrollToDom = ref(null)
const qInoutEl = ref(null) as any

let flat = true

const submit = () => {
  // if (STATUS.value !== 0) return
  let aiReply = '',
    req = textarea.value
  const chatItem = reactive({
    question: '',
    questionTime: '',
    rep: '',
    repTime: ''
  })
  chatItem.question = textarea.value
  chatItem.questionTime = new Date().toLocaleString()
  textarea.value = ''
  if (!req.trim()) {
    return
  }
  STATUS.value = 1
  chatList.value = [...chatList.value, req, aiReply]
  chatsList.push(chatItem)
  flat = true
  // sendReq(req)
  const postOpenAiPromise = postOpenAi(chatItem.question)
  useActionRequest(postOpenAiPromise).then(res => {
    console.log('🚀 ~ file: ChatComponent.vue:42 ~ postOpenAi ~ res:', res)
    chatList.value[chatList.value.length - 1] = res
    chatItem.rep = res
    chatItem.repTime = new Date().toLocaleString()
    chatTmpList.push(chatItem)
    console.log('🚀 ~ file: ChatComponent.vue:59 ~ useActionRequest ~ chatItem:', JSON.stringify(chatItem))
    STATUS.value = 0
    ElMessage({
      message: '',
      type: 'success'
    })
    saveLocalStorage(chatsList, 'chatsList')
  })

  setTimeout(() => {
    document.querySelector('.chat-item-scrollTo')!.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' })
  })
}

onBeforeMount(() => {
  // chatList.value = getLocalStorage()
  chatsList.push(...getLocalStorage())
  console.log('🚀 ~ file: ChatComponent.vue:76 ~ onBeforeMount ~ chatsList:', chatsList)
})

onBeforeUnmount(() => {
  // ws.close()
})

onMounted(() => {
  ;(scrollToDom.value as any).scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' })

  var allowedElements = document.querySelectorAll('.submit-bottom')
  let oldScrollTop = 0
  document.querySelector('.chat-list')!.addEventListener('scroll', function (e) {
    //@ts-ignore
    if (e.target!.scrollTop < oldScrollTop) {
      flat = false
    }
    //@ts-ignore
    oldScrollTop = e.target!.scrollTop

    if (isAllowedScrollElement(e.target)) {
      e.preventDefault()
    }
  })

  function isAllowedScrollElement(element) {
    for (var i = 0; i < allowedElements.length; i++) {
      if (allowedElements[i].contains(element)) {
        return true
      }
    }
    return false
  }
  document.addEventListener('touchmove', function (e) {
    if (!isAllowedScrollElement(e.target)) {
      var activeElement = document.activeElement
      if (activeElement!.tagName === 'INPUT' || activeElement!.tagName === 'TEXTAREA') {
        //@ts-ignore
        activeElement!.blur()
      }
    }
  })
  // document.querySelector('.submit-bottom')!.addEventListener(
  //   'touchmove',
  //   // 'scroll',
  //   function (event) {
  //     console.log('🚀 ~ file: ChatComponent.vue:70 ~ onMounted ~ event:', event)
  //     event.preventDefault()
  //   },
  //   false
  // )
  let isComposition = false
  const qInoutEl = document.querySelector('.chat-input') as any
  qInoutEl.addEventListener('compositionstart', () => {
    isComposition = true
  })

  qInoutEl.addEventListener('compositionend', event => {
    isComposition = false
  })

  qInoutEl.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !isComposition) {
      event.preventDefault()
      submit()
    }
  })
})

/** 断开重联 */
const reInit = () => {
  // ws.close()
  /** 这个地方是假状态 */
  STATUS.value = 0
}

/**转译html */
const Translation = (params = '') => {
  let res
  res = params.replace(/\t/g, '&nbsp;&nbsp;').replace(/ /g, '&nbsp;&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  if (res?.indexOf('\n') !== -1) {
    res = res.replace(/\n/g, '<br>')
  }
}

/** 处理正常的回复流字符串 */
const aiRepHandle = (str = '') => {
  STATUS.value = 2
  chatList.value[chatList.value.length - 1] += str
  if (flat) {
    setTimeout(() => {
      ;(scrollToDom.value as any).scrollIntoView({
        behavior: 'auto',
        block: 'end',
        inline: 'nearest'
      })
    })
  }
}

handleFns.mesHandle = event => {
  let res = event.data
  try {
    let data = JSON.parse(res)
    if (data.msg === 'DONE') {
      STATUS.value = 0
      saveLocalStorage(chatList.value)
    }
    if (!data.time) {
      //不是对象，是回复流
      aiRepHandle(data)
    }
  } catch (error) {
    //不是对象，是回复流
    aiRepHandle(res)
  }
}

handleFns.closeHandle = event => {
  console.log(
    'WebSocket closed with code ' +
      event.code +
      ' and reason ' +
      event.reason +
      'time:' +
      new Date().toLocaleTimeString()
  )
  STATUS.value = 0
  // initWs()
}

handleFns.errorHandle = () => {
  STATUS.value = 0
  // initWs()
}

handleFns.openHandle = () => {
  //  STATUS.value = 0
}

// initWs()
</script>

<template>
  <div class="chat-list">
    <div v-for="(item, index) of chatsList" :key="index">
      <div class="chat-item chat-item-user">
        <div class="chat-item-rep mr-10 user">{{ item.question }}</div>
        <div class="me square">我</div>
      </div>
      <div class="chat-item">
        <div class="square">ai</div>
        <div class="chat-item-rep ml-10">
          <RepLoading v-if="!item.rep" />
          <span>
            {{ item.rep }}<span :class="{ 'rep-light-cursor': index === chatList.length - 1 && STATUS === 2 }"></span
          ></span>
        </div>
      </div>
    </div>

    <div class="chat-item-scrollTo" ref="scrollToDom"></div>
  </div>

  <div class="submit-bottom">
    <el-button type="danger" round class="doneRep" v-show="pendingCount !== 0" @click="reInit">终止回答</el-button>
    <el-input
      ref="qInoutEl"
      class="do-scrollbar-b chat-input"
      v-model="textarea"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      placeholder="欢迎提问～"
    />
    <el-button type="primary" class="ml-10 submit-btn" @click="submit">
      <!-- {{ STATUS !== 0 ? '回复中' : '提交' }} -->
      {{ '提交' }}
      <!-- <el-icon class="is-loading" v-if="STATUS !== 0"> <Loading /> </el-icon> -->
    </el-button>
  </div>
</template>

<style lang="less" scoped>
.doneRep {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 5px rgb(162, 162, 162);
}

.rep-light-cursor {
  display: inline-block;
  width: 2px;
  height: 20px;
  position: relative;
  top: 5px;
  left: 3px;
  background: linear-gradient(to top, #115ffb, #0a22fb);
  animation: blink 1s linear infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.chat-list {
  width: 100%;
  height: 100vh;
  padding: 0 15vw;
  // padding-bottom: 15vh;
  overflow: hidden;
  overflow-y: auto;

  .chat-item {
    margin-top: 30px;
    width: 100%;
    display: flex;
    font-size: 16px;
    color: #000000d9;
    font-size: 16px;
    font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', Segoe UI Symbol, 'Noto Color Emoji';
    .chat-item-rep {
      max-width: 100%;
      // width: 100%;
      min-width: 40px;
      // flex: 1;
      overflow-x: auto;
      background-color: #fff;
      min-height: 18px;
      border-radius: 6px;
      padding: 5px 8px;
      display: flex;
      align-items: center;
      white-space: pre-wrap;
      // word-wrap: break-word;
    }

    .user {
      width: auto;
      // flex: auto;
      min-width: auto;
      white-space: pre-wrap;
    }

    .square {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background: #c0c4cc;

      min-width: 36px;
      height: 36px;
      font-size: var(--el-avatar-text-size);
      border-radius: 4px;
    }

    .me {
      background-color: #626aef;
    }
  }

  .chat-item-user {
    display: flex;
    justify-content: flex-end;
  }
}

.chat-item-scrollTo {
  height: 20vh;
  min-height: 140px;
}

.submit-bottom {
  width: 100%;
  // height: 20vh;
  // position: absolute;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  border-top: 1px solid #dcdfe6;
  padding: 0 10vw;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #f8f8fa;

  .chat-input {
    :deep(.el-textarea__inner) {
      box-shadow: none;
      // box-shadow: 0px 0px 1px #888888;
    }
  }

  .submit-btn {
    // box-shadow: 0px 1px 1px #88888866;
  }
}

@media screen and (max-width: 992px) {
  .submit-bottom {
    padding: 0 5vw;
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .chat-list {
    // height: 86vh;
    padding: 0 5vw;

    // padding-bottom: 13vh;
    .chat-item-scrollTo {
      height: 15vh;
    }
  }
}
</style>
