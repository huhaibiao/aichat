<!--
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-03-29 15:35:57
 * @Description: 
-->
<script setup>
import { reactive, ref, toRef, watch } from 'vue'
import {pendingCount} from './useRequest';

const mode = ref(__APP_ENV__)

</script>

<template>
  <div class="development" v-if="mode === 'development'">
    <div>开发环境</div> 

    <!-- <div>ws连接状态：{{ Model.ws.readyState }}</div> -->
    <div>ws连接状态：{{  }}</div>

    <div>正在请求中数：{{ pendingCount }}</div>
</div>



</template>

<style lang="less" scoped>
.development {
  position: fixed;
  z-index: 2;
  right: 10px;
  top: 10px;
//   min-width: 100px;
padding: 5px;
//   max-width: 150px;
  min-height: 30px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.429);
  box-shadow: 0 0 3px #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
flex-direction: column;
  color: #fff;
}
</style>
