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
import { JLogin, touchSwiper } from './components/utils'
import DownLoadChatsList from './components/DownLoadChatsList.vue'
import QuestList from './components/QuestList.vue'
//@ts-ignore
import HelpFilled from '~icons/ep/HelpFilled'
import WsChat from './components/WsChat.vue'

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
  touchSwiper(document, () => (controlShow.value = true))
})
</script>

<template>
  <div class="exp-chat-list" v-if="!login">
    <el-icon :size="30" style="margin-top: 10px; cursor: pointer" color="#409EFC" @click="controlShow = !controlShow">
      <HelpFilled />
    </el-icon>

    <el-drawer v-model="controlShow" title="I am the title" :with-header="false" size="220">
      <DownLoadChatsList></DownLoadChatsList>
      <QuestList style="margin-top: 10px" @change="questListChange"></QuestList>
    </el-drawer>
  </div>

  <el-dialog v-model="dialogVisible" :title="chat.question" width="80%">
    <div style="white-space: pre-wrap">{{ chat.rep }}</div>
  </el-dialog>

  <!-- <Developer /> -->

  <div style="width: 100%; height: 100%" class="chat-component" v-if="!login">
    <!-- <ChatComponent @j-login="isLogin"></ChatComponent> -->
    <WsChat @j-login="isLogin"></WsChat>
  </div>
  <div class="login" v-if="login">
    <Login @login-success="login = false"></Login>
  </div>
</template>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  // overflow: hidden;
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
  // width: 20px;
  // height: 20px;
  // display: flex;
  justify-content: center;
  align-items: end;
}
</style>
