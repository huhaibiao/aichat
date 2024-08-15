<!--
 * @Author: huhaibiao
 * @Date: 2023-05-24 15:04:47
-->
<script lang="ts" setup name="WsChatOther">
//只接收数据
import { baseState, otherChatList } from '../store'

const emit = defineEmits(['close'])
</script>

<template>
  <div class="chat-list modal">
    <div class="content">
      <div v-for="(item, index) of otherChatList" class="chat-item" :key="item.repTime">
        <div class="chat-item-user" style="position: relative">
          <div class="square">X</div>
          <div class="ml-10 chat-item-content">{{ item.question }}</div>
          <div class="time" style="position: absolute; bottom: -25px; left: 50px">
            <el-text type="info" size="small">{{ '时间:' + item.questionTime }}</el-text>
          </div>
        </div>

        <div class="" style="position: relative">
          <div class="square" :class="{ isMobile: baseState.isMobile }">ai</div>
          <div class="ml-10 chat-item-content">
            <span :class="index + 1 + ''"> {{ item.rep }}</span>
          </div>

          <div class="time" style="position: absolute; bottom: -25px; left: 50px">
            <el-text type="info" size="small">{{ '时间:' + item.repTime }}</el-text>
          </div>
        </div>
      </div>

      <div class="chat-item-scrollTo"></div>
    </div>

    <el-button class="exit-btn" @click="emit('close')">退出</el-button>
  </div>
</template>

<style lang="less" scoped>
.exit-btn {
  position: absolute;
  top: 5%;
  right: 5%;
  margin: 2px;
}

.content {
  width: 90%;
  height: 90%;
  background-color: #f2f3f5;
  border-radius: 6px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  .chat-item {
    margin-bottom: 10px;
    > div {
      margin-top: 30px;
      display: flex;
      flex-direction: row;
      margin-top: 30px;
      width: 100%;
      display: flex;
      font-size: 16px;
      // color: #000000d9;
      color: #252933;
      font-size: 16px;
      font-family: Avenir, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
        sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', Segoe UI Symbol, 'Noto Color Emoji';
    }
    .chat-item-content {
      max-width: 100%;
      min-width: 40px;
      overflow-x: auto;
      background-color: #fff;
      min-height: 18px;
      border-radius: 6px;
      padding: 10px 10px;
      display: flex;
      align-items: center;
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
  .square {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: #c0c4cc;
    min-width: 36px;
    height: 36px;
    font-size: 18px;
    border-radius: 4px;
    background-color: #626aef;
  }

  .isMobile {
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  }
}
.modal {
  width: 100vw;
  height: 100vh;
  background-color: var(--el-overlay-color-lighter);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
