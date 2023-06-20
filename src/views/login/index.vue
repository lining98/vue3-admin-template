<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到规格甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useRoute, useRouter } from 'vue-router'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'
import { ElNotification } from 'element-plus'
const { userLogin } = useUserStore()

const route = useRoute()
const router = useRouter()

const loginForms = ref()
const loading = ref(false)

// 收集账号与密码的数据
const loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})

// 登录按钮回调
const login = async () => {
  // 保证全部表单校验通过再发请求
  await loginForms.value.validate()

  loading.value = true
  try {
    // 保证登录成功
    await userLogin(loginForm)
    // 判断登录的时候，路由路径当中是否有query参数
    let redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `Hi,${getTime()}好`,
    })

    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification.error((error as Error).message)
  }
}

// 自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule:即为校验规则对象
  // value:即为表单元素文本的值
  // callback() 函数 如果符合条件callback放行通过
  //                 如果不符合callback方法，注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}

// 定义表单校验需要配置对象
const rules = {
  username: [{ validator: validatorUserName, trigger: 'change' }],
  password: [{ validator: validatorPassword, trigger: 'change' }],
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    margin: 0 auto;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 20px 40px;
    h1 {
      font-size: 40px;
      color: #fff;
    }
    h2 {
      font-size: 20px;
      color: #fff;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
