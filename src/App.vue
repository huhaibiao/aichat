<script setup>
import { ref } from 'vue';
import ChatComponent from './components/ChatComponent.vue'
import Login from './components/Login.vue';
import Developer from './components/Developer.vue';
import {JLogin} from './components/utils';
let login = ref(true)
const isLogin = () => {
  login.value = JLogin()
}
isLogin()

</script>

<template>
  <Developer />

  <div style="width: 100%; height: 100%" class="chat-component" v-if="!login">
    <ChatComponent @j-login="isLogin"></ChatComponent>
  </div>
  <div class="login" v-if="login">
    <Login @login-success="login=false"></Login>
  </div>

</template>

<style scoped lang="less">
.login{
  width: 100%;
  height: 100%;
  // overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
