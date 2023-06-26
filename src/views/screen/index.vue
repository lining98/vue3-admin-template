<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <Top />
      <div class="main">
        <Left />
        <Center />
        <Right />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Top from './components/Top.vue'
import Left from './components/left/index.vue'
import Center from './components/center/index.vue'
import Right from './components/right/index.vue'

const screen = ref()

// 定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    background-color: rgba($color: #000000, $alpha: 0.2);
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .main {
      height: 1040px;
      padding-top: 15px;
      display: flex;
      .right {
        flex: 1;
      }
    }
  }
}
</style>
