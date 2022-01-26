<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: '',
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  mounted() {
    this.init([120, 200, 150, 80, 70, 110, 130])

    this.mysort()
  },
  methods: {
    init(data) {
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);
      var option

      option = {
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }

      option && myChart.setOption(option);

    },

    mysort() {
      let newArr = []
      function popSort(arr) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {        //相邻元素两两对比
              var temp = arr[j + 1];        //元素交换
              arr[j + 1] = arr[j];
              arr[j] = temp
              newArr.push(JSON.parse(JSON.stringify(arr)))
            }
          }
        }
        return arr
      }0
      console.log(newArr)
      popSort([120, 200, 150, 80, 70, 110, 130])
      let timer = null
      let n = 0
      timer = setInterval(() => {
        if (newArr[n]) {
          this.init(newArr[n])
          n++
        } else {
          clearInterval(timer)
        }
      }, 300)
    }
  },
}
</script>

<style scoped lang="less">
#main {
  width: 800px;
  height: 450px;
}
</style>
