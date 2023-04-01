import { onBeforeUnmount, onBeforeMount, onUnmounted, Ref, ref } from 'vue'

let chatList = ref<string[]>(['q', 'a'])

export { chatList }
