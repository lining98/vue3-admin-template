<template>
  <div class="line">
    <div class="title">
      <p>未来七天游客数量趋势图</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="chart" ref="lineChart"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const lineChart = ref()

onMounted(() => {
  let myChart = echarts.init(lineChart.value)
  myChart.setOption({
    title: {
      text: '访问量',
    },
    grid: {
      left: 50,
      top: 20,
      right: 20,
      bottom: 20,
    },
    xAxis: {
      type: 'category',
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    series: {
      type: 'line',
      data: [120, 1240, 66, 2299, 321, 890, 1200],
      //平滑曲线的设置
      smooth: true,
      //区域填充样式
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'skyblue', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(100, 151, 188,.3)', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    },
  })
})
</script>

<style lang="scss" scoped>
.line {
  flex: 1.2;
  background: url('../../images/dataScreen-main-cb.png') no-repeat;
  background-size: cover;
  margin: 0 20px;
  .title {
    margin-left: 10px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .chart {
    height: calc(100% - 45px);
  }
}
</style>
