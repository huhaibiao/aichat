<script lang="ts" setup name="ChatListPanel">
import RepLoading from './Loading.vue'
import { onBeforeUnmount, onBeforeMount, onUnmounted, Ref, ref, onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'

/** 对话状态： 包括 0空闲中，1发送中和等待回复中，2回复中，0回复结束 */
let STATUS = ref(0)
// const chatsList = reactive<any[]>([])
let { chatsList } = defineProps(['chatsList'])
const scrollToDom = ref(null)

onBeforeMount(() => {

})

onMounted(() => {
  ; (scrollToDom.value as any).scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' })
})
</script>

<template>
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
          {{ item.rep }}<span
            :class="{ 'rep-light-cursor': index === chatsList.length - 1 && STATUS === 2 }"></span></span>
      </div>
    </div>
  </div>

  <div class="chat-item-scrollTo" ref="scrollToDom"></div>
</template>

<style lang="less" scoped>
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

.chat-item-scrollTo {
  height: 20vh;
  min-height: 140px;
}
</style>
