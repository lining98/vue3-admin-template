<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { ref, watch,nextTick } from 'vue';
import { useSettingStore } from '@/store/setting'
import { storeToRefs } from 'pinia'
const { refresh } = storeToRefs(useSettingStore())

// 控制当前组件是否销毁重建
const flag = ref(true)

// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击刷新按钮
watch(()=>refresh.value,()=>{
  flag.value = false
  nextTick(()=>{
    flag.value = true
  })
})
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
}

// .fade-enter-active {
//   animation: bounce-in-right .3s both; /* both 表示保留最终状态 */
// }
// @keyframes bounce-in-right {
// }
// @keyframes fade-in-fwd {
//   0% {
//     transform: translateZ(-80px);
//     opacity: 0;
//   }
//   100% {
//     transform: translateZ(0);
//     opacity: 1;
//   }
// }

// .fade-enter-active {
//   animation: slide-in-elliptic-right-fwd 0.5s both; /* both 表示保留最终状态 */
// }
// @keyframes slide-in-elliptic-right-fwd {
//   0% {
//     -webkit-transform: translateZ(-800px) rotateY(90deg);
//     transform: translateZ(-800px) rotateY(90deg);
//     opacity: 0;
//   }
//   54% {
//     -webkit-transform: translateZ(-160px) rotateY(87deg);
//     transform: translateZ(-160px) rotateY(87deg);
//     opacity: 1;
//   }
//   100% {
//     -webkit-transform: translateZ(0) rotateY(0);
//     transform: translateZ(0) rotateY(0);
//   }
// }
</style>
