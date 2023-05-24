import { isMobile } from '../utils'

/*
 * @Author: huhaibiao
 * @Date: 2023-05-23 19:36:08
 */
export const baseState = reactive({
  isMobile: isMobile(),
  online: 0, //在线用户数,
  questions: 0 //问题数
})

export const otherChatShow = ref(false)

export const otherChatList = reactive<any[]>([])
