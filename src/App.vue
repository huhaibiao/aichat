<!--
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-04 20:21:05
 * @Description: 
-->
<script setup lang="ts" name="App">
import { ref, onMounted } from 'vue'
// import ChatComponent from './components/ChatComponent.vue'
import Login from './components/Login.vue'
import Developer from './components/Developer.vue'
import { JLogin, touchSwiper } from './utils'
import DownLoadChatsList from './components/DownLoadChatsList.vue'
import QuestList from './components/QuestList.vue'
import WsChat from './components/WsChat.vue'
import HeadTip from './components/HeadTip.vue'
import { baseState, otherChatShow } from './store'
import WsChatOther from './components/WsChatOther.vue'

let login = ref(true)
const isLogin = () => {
  login.value = JLogin()
}
isLogin()
const chat = ref({
  question: '',
  rep: ''
})
const dialogVisible = ref(false)

const questListChange = (index, chatItem) => {
  chat.value = chatItem
  dialogVisible.value = true
}

const controlShow = ref(false)
onMounted(() => {
  touchSwiper(chatDom.value, () => (controlShow.value = true))
})
const chatDom = ref(null)

const showOtherChat = () => {
  controlShow.value = false
  otherChatShow.value = true
}
</script>

<template>
  <div class="login" v-if="login">
    <!-- 登陆页面 -->
    <Login @login-success="login = false"></Login>
  </div>
  <div v-else>
    <!-- 登陆成功页面 -->
    <div class="chat-component" ref="chatDom" style="width: 100%; height: 100%">
      <!-- <ChatComponent @j-login="isLogin"></ChatComponent> -->
      <WsChat @j-login="isLogin"></WsChat>
    </div>

    <div class="top">
      <HeadTip></HeadTip>
      <!-- <Developer /> -->
    </div>
    <div class="right exp-chat-list">
      <el-icon
        :size="30"
        style="margin-top: 30px; cursor: pointer"
        v-show="!baseState.isMobile && !controlShow"
        @click="controlShow = !controlShow"
      >
        <IEpDArrowLeft />
      </el-icon>

      <el-drawer v-model="controlShow" title="I am the title" :with-header="false" size="220">
        <div style="display: flex; flex-direction: column; align-items: start">
          <DownLoadChatsList></DownLoadChatsList>
          <el-button type="success" class="other-chats" style="margin: 0; margin-top: 10px" @click="showOtherChat"
            >查看其他用户的交流</el-button
          >
          <QuestList style="margin-top: 10px" @change="questListChange"></QuestList>
        </div>
        <el-dialog v-model="dialogVisible" :title="chat.question" width="80%">
          <div style="white-space: pre-wrap">{{ chat.rep }}</div>
        </el-dialog>
      </el-drawer>
    </div>

    <div class="other">
      <WsChatOther v-if="otherChatShow" @close="otherChatShow = false"></WsChatOther>
    </div>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.exp-chat-list {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 120;
  top: 5px;
  right: 20px;
  justify-content: center;
  align-items: end;
}
.top {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 28px;
}
</style>
