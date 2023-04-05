<!--
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-05 15:06:30
 * @Description: 
-->
<script setup lang="ts" name="QuestList">
import { ref } from 'vue'
import { getLocalStorage } from './utils'

const chatList = ref(getLocalStorage())
const value = ref()
const emit = defineEmits(['change'])
const onChange = index => {
  emit('change', index, chatList.value[index])
}
</script>
<template>
  <el-select v-model="value" clearable placeholder="打开问题列表" @change="onChange">
    <el-option class="option" v-for="(item, index) in chatList" :key="index" :label="item.question" :value="index">
      <el-tooltip class="box-item" effect="dark" :content="item.question" :hide-after="0" placement="top">
        {{ item.question }}
      </el-tooltip>
    </el-option>
  </el-select>
</template>

<style lang="less" scoped>
.option {
  width: 200px;
}
</style>
