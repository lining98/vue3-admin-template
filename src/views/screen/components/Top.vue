<template>
  <div class="top">
    <div class="left">
      <span class="lbtn btn" @click="router.push('/')">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn btn" @click="">统计报告</span>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import moment from 'moment'

const router = useRouter()

// 存储当前时间
const time = ref()
const timer = ref(0)

onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY-MM-DD hh:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 40px;
  display: flex;
  color: #29fcff;
  .left {
    flex: 1.5;
    background: url('../images/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    .lbtn {
      float: right;
      background: url('../images/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: cover;
    }
  }
  .center {
    flex: 2;
    .title {
      height: 74px;
      line-height: 74px;
      font-size: 30px;
      background: url('../images/dataScreen-header-center-bg.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
    }
  }
  .right {
    flex: 1.5;
    background: url('../images/dataScreen-header-right-bg.png') no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      float: left;
      background: url('../images/dataScreen-header-btn-bg-r.png') no-repeat;
    }
    .time {
      font-size: 18px;
      margin-right: 20px;
    }
  }
  .btn {
    width: 150px;
    height: 40px;
    background-size: 100% 100%;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
