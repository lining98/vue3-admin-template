<template>
  <div class="tourist">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="count">
        可预约总量
        <span>99999999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 图表 -->
    <div class="charts" ref="chart" style="height: 245px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const people = ref('215908人')
const chart = ref()

onMounted(() => {
  // 获取echarts类的实例
  let myCharts = echarts.init(chart.value)
  myCharts.setOption({
    title: {
      text: '水球图',
    },
    xAxis: {
      axisLine: false,
    },
    yAxis: {
      axisLine: false,
    },
    // 系列
    series: {
      type: 'liquidFill',
      radius: '90%',
      animationDuration: 0,
      animationDurationUpdate: 0,
      data: [0.6, 0.5, 0.4, 0.3],
      outline: {
        //外层边框颜色设置
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: 'skyblue',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
        },
      },
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style lang="scss" scoped>
.tourist {
  color: #fff;
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  .top {
    margin-left: 20px;
    font-size: 20px;
    .bg {
      width: 68px;
      height: 7px;
      background: url('../../images/dataScreen-title.png') no-repeat;
      margin-top: 10px;
    }
    .count {
      float: right;
      span {
        font-size: 18px;
        color: yellowgreen;
      }
    }
  }
  .number {
    margin-top: 30px;
    display: flex;
    padding: 15px 0;
    span {
      flex: 1;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
}
</style>
