<!--
 * @Author: huhaibiao
 * @Date: 2023-05-23 18:46:21
-->
<script setup lang="ts">
import { baseState, otherChatShow } from '../store'
</script>

<template>
  <div class="head-tip">
    <span
      >当前用户：<span class="font-14">{{ baseState.online }}</span></span
    >
    <span style="border-radius: 3px; padding: 0 4px" @click="otherChatShow = true"
      >正在回复：<span class="font-14-danger"
        >{{ baseState.questions }}
        <!-- <el-icon style="margin: 2px" :size="16"><IEpPointer /></el-icon> -->
      </span></span
    >
    <span v-if="baseState.isMobile">左滑更多功能</span>
  </div>
</template>

<style lang="less" scoped>
.head-tip {
  width: 100%;
  height: 100%;
  background-color: #212121b6;
  border-radius: 0;
  //   opacity: 0.7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ebe7e7;
  font-size: 14px;
  padding: 0 10px;
}
.font-14 {
  font-size: 14px;
  color: #67c23a;
}
.font-14-danger {
  font-size: 14px;
  color: #f56c6c;
}
</style>
