<script lang="ts" setup name="ChatListPanel">
import RepLoading from './Loading.vue'
import { onBeforeUnmount, onBeforeMount, onUnmounted, Ref, ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const textarea = ref('')
/** 对话状态： 包括 0空闲中，1发送中和等待回复中，2回复中，0回复结束 */
let STATUS = ref(0)
let chatList = ref<string[]>([])
const chatsList = reactive<any[]>([])

const scrollToDom = ref(null)
const qInoutEl = ref(null) as unknown

onBeforeMount(() => {
  
})

onMounted(() => {
  ;(scrollToDom.value as any).scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' })

  var allowedElements = document.querySelectorAll('.submit-bottom')
  let oldScrollTop = 0
  document.querySelector('.chat-list')!.addEventListener('scroll', function (e) {
    //@ts-ignore
    if (e.target!.scrollTop < oldScrollTop) {
      //   flat = false
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
  let isComposition = false
  const qInoutEl = document.querySelector('.chat-input') as any
  qInoutEl.addEventListener('compositionstart', () => {
    isComposition = true
  })

  qInoutEl.addEventListener('compositionend', event => {
    isComposition = false
  })
})
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
