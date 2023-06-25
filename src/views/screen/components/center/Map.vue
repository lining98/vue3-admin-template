<template>
  <div class="map">
    <div ref="mapChart" style="height: 100%"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

import chinaJSON from './china.json'

const mapChart = ref()
echarts.registerMap('china', chinaJSON as any)

onMounted(() => {
  let mychart = echarts.init(mapChart.value)
  mychart.setOption({
    geo: {
      map: 'china', //中国地图
      roam: true, // 鼠标缩放
      // 地图的位置
      left: 50,
      right: 50,
      top: 50,
      bottom: 0,
      label: {
        show: true, //显示省市
        color: '#fff',
        fontSize: 14,
      },
      itemStyle: {
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
              color: 'blue', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.9,
      },
      // 地图高亮的效果
      emphasis: {
        itemStyle: {
          color: 'red',
        },
        label: {
          fontSize: 22,
          color: '#ddd',
        },
      },
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [102.712251, 25.040609], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              type: 'dashed',
              color: 'red',
              width: 5,
            },
          },
          {
            coords: [
              [113.665412, 34.757975], // 起点
              [121.472644, 31.231706], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              type: 'dashed',
              color: 'orange',
              width: 5,
            },
          },
        ],
        // 开启动画特效
        effect: {
          show: true,
          symbol: 'triangle',
          color: 'arrow',
          symbolSize: 15,
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.map {
  flex: 4;
}
</style>
