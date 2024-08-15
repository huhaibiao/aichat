<!--
 * @Author: huhaibiao
 * @Date: 2023-04-05 15:06:30
 * @Description: 
-->
<script setup lang="ts" name="QuestList">
import { ref } from 'vue'
import { getLocalStorage, isMobile } from '../utils'

const chatList = ref(getLocalStorage())
const value = ref()
const emit = defineEmits(['change'])
const onChange = index => {
  emit('change', index, chatList.value[index])
}
const isMobile1 = isMobile()
const isMobileV = ref(isMobile1)
</script>
<template>
  <el-select v-model="value" placeholder="打开问题列表" filterable @change="onChange" style="height: 800px">
    <el-option class="option" v-for="(item, index) in chatList" :key="index" :label="item.question" :value="index">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="item.question"
        :hide-after="0"
        placement="top"
        v-if="!isMobileV"
      >
        {{ item.question }}
      </el-tooltip>
      <div v-else>
        {{ item.question }}
      </div>
    </el-option>
  </el-select>
</template>

<style lang="less" scoped>
.option {
  width: 200px;
  padding: 0 0 0 8px;
}
</style>

<style>
.el-select-dropdown__wrap {
  max-height: 500px;
}
</style>
