<!--
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-04 20:21:05
 * @Description: 
-->
<script setup>
import { ref } from 'vue'
import ChatComponent from './components/ChatComponent.vue'
import Login from './components/Login.vue'
import Developer from './components/Developer.vue'
import { JLogin } from './components/utils'
import DownLoadChatsList from './components/DownLoadChatsList.vue'
import { defineAsyncComponent } from 'vue'
import HelpFilled from '~icons/ep/HelpFilled'
const QuestList = defineAsyncComponent(() => import('./components/QuestList.vue'))
// const Login = defineAsyncComponent(() => import('./components/Login.vue'))
// const Developer = defineAsyncComponent(() => import('./components/Developer.vue'))

let login = ref(true)
const isLogin = () => {
  login.value = JLogin()
}
isLogin()
const chat = ref({})
const dialogVisible = ref(false)

const questListChange = (index, chatItem) => {
  chat.value = chatItem
  dialogVisible.value = true
}

const controlShow = ref(false)
  
</script>

<template>
  <div class="exp-chat-list" v-if="!login">
  <el-icon :size="30" style="margin: 10px " @click="controlShow=!controlShow">
       <HelpFilled  />
  </el-icon>
    <DownLoadChatsList v-if="controlShow"></DownLoadChatsList>
    <QuestList style="margin-top: 10px" @change="questListChange" v-if="controlShow"></QuestList>
  </div>

  <el-dialog v-model="dialogVisible" :title="chat.question" width="80%">
    <div style="white-space: pre-wrap">{{ chat.rep }}</div>
  </el-dialog>

  <Developer />

  <div style="width: 100%; height: 100%" class="chat-component" v-if="!login">
    <ChatComponent @j-login="isLogin"></ChatComponent>
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
  z-index: 12;
  top: 5px;
  right: 20px;
  // width: 20px;
  // height: 20px;
  // display: flex;
  justify-content: center;
  align-items: end;
}
</style>
