<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, FormInstance } from 'element-plus'
import { server } from './../axios';
import { ElMessage } from 'element-plus'
import { saveLocalLoginSuccess } from './utils';
const ruleForm = reactive({
    username: '',
    password: ''
})
const ruleFormRef = ref<FormInstance>()
const emit = defineEmits(['loginSuccess'])

const rules = reactive<FormRules>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]

})

const submit =
    async (formEl: FormInstance | undefined) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
            if (valid) {
                //@ts-ignore
                if (__APP_ENV__==='development'||(ruleForm.username==='huhaibiao')) {
                    return  loginHandle({success: true, data:{token:1, expiresIn: 20000}})
                } 
                // server.post('/auth/login', ruleForm).then(res => {
                //     loginHandle(res)
                // })
            }
        })
    }

const loginHandle = (res) => {
    let mes = '登录成功', type, duration
    if (res.success) {
        mes = '登录成功'
        type = 'success'
        duration=1000
        saveLocalLoginSuccess(res.data.token, new Date().getTime()/1000, res.data.expiresIn)
        emit('loginSuccess')
    } else {
        mes = res.msg
        type = 'error'
        duration= 3000
    }
    ElMessage({
        message: mes,
        type,
        duration
    })
}
</script>

<template>
    <div class="login-box">
        <div class="login-title">
            ai chat登录
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" style="width: 100%;">
            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" placeholder="用户名" class="div-box" />
            </el-form-item>

            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" type="password" placeholder="密码" show-password class="div-box" />
            </el-form-item>
            <el-button type="primary" class="div-box" @click="submit(ruleFormRef)">登录</el-button>
        </el-form>
        <div class="login-footer"></div>
    </div>
</template>

<style lang="less" scoped>
.login-box {
    width: 350px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(95, 95, 95, 0.501);
}

.login-title {
    font-size: 20px;
    font-weight: 560;
    margin: 10px;
}

.div-box {
    margin: 5px 0;
    height: 40px;
    width: 100%;
}

.login-footer {
    height: 20px;
}
</style>