/*
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-02 22:34:03
 */
import { ref } from "vue"

const promises = []
const pendingCount = ref(0)
const useActionRequest = (fnPromise) => {
    pendingCount.value++
    return fnPromise.finally(res => {
        pendingCount.value--
    })
}

export {
    pendingCount, useActionRequest
}

const resolveAll = (params) => {
    return Promise.all(promises).then(res => {
        isResolveAll = true
        return res
    })

}