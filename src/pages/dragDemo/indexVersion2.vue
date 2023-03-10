<template>
  <div>
    <viewFullScreen style="background:#fff" :is-full-screen="isFullScreen">
      <div>
        <el-button type="primary" @click="setBig">模拟模块改变</el-button>
        <el-button type="primary" @click="isFullScreen=!isFullScreen">全屏</el-button>
        <!-- you bug -->
        <el-button type="primary" @click="goBack">后退 </el-button>
        <el-button type="primary" @click="goForward">前进 </el-button>
      </div>
      <grid-layout ref="gridLayout" :layout.sync="layout" :col-num="12" :row-height="90" :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]"
        :use-css-transforms="true" :isResizable="true">
        <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" drag-allow-from=".vue-draggable-handle" drag-ignore-from=".no-drag"
          @moved="movedEvent">
          {{item.i}}
          <div class="vue-draggable-handle">拖动</div>
          <div class="no-drag">内容</div>
        </grid-item>
      </grid-layout>
    </viewFullScreen>
  </div>
</template>

<script>
// VueGridLayout文档访问： https://jbaysolutions.github.io/vue-grid-layout/zh/guide/
import VueGridLayout from 'vue-grid-layout'

import viewFullScreen from '@/pages/screenfull/componentScreenfull/viewFullScreen'

import Trigger from '@/pages/ctrlZ+Y/coreVersion2'
export default {
  name: 'indexVersion2',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    viewFullScreen
  },
  props: {

  },
  data() {
    return {
      isFullScreen: false,
      layout: [
        { 'x': 0, 'y': 0, 'w': 2, 'h': 2, 'i': '0' },
        { 'x': 2, 'y': 10, 'w': 2, 'h': 1, 'i': '1' },
        // { 'x': 2, 'y': 0, 'w': 2, 'h': 2, 'i': '2' }
        { 'x': 4, 'y': 0, 'w': 2, 'h': 5, 'i': '2' },
        { 'x': 6, 'y': 0, 'w': 2, 'h': 3, 'i': '3' },
        { 'x': 8, 'y': 0, 'w': 2, 'h': 3, 'i': '4' },
        { 'x': 10, 'y': 0, 'w': 2, 'h': 3, 'i': '5' },
        { 'x': 0, 'y': 5, 'w': 2, 'h': 5, 'i': '6' },
        { 'x': 2, 'y': 5, 'w': 2, 'h': 5, 'i': '7' },
        { 'x': 4, 'y': 5, 'w': 2, 'h': 5, 'i': '8' },
        { 'x': 6, 'y': 3, 'w': 2, 'h': 4, 'i': '9' },
        { 'x': 8, 'y': 4, 'w': 2, 'h': 4, 'i': '10' },
        { 'x': 10, 'y': 4, 'w': 2, 'h': 4, 'i': '11' },
        { 'x': 0, 'y': 10, 'w': 2, 'h': 5, 'i': '12' },
        { 'x': 2, 'y': 10, 'w': 2, 'h': 5, 'i': '13' },
        { 'x': 4, 'y': 8, 'w': 2, 'h': 4, 'i': '14' },
        { 'x': 6, 'y': 8, 'w': 2, 'h': 4, 'i': '15' },
        { 'x': 8, 'y': 10, 'w': 2, 'h': 5, 'i': '16' },
        { 'x': 10, 'y': 4, 'w': 2, 'h': 2, 'i': '17' },
        { 'x': 0, 'y': 9, 'w': 2, 'h': 3, 'i': '18' },
        { 'x': 2, 'y': 6, 'w': 2, 'h': 2, 'i': '19' }
      ]
    }
  },
  mounted() {
    this.trigger = new Trigger(list => this.layout = list)
    this.record(this.layout)
  },
  beforeDestroy() {
    this.trigger.removeEvent()
  },
  methods: {
    goBack() {
      this.trigger.goBack()
    },
    goForward() {
      this.trigger.goForward()
    },



    setBig() {
      // eventName, id, x, y, h, w
      this.layout[0].y = Math.floor(Math.random() * 9) + 1
      const { eventName, i, x, y, h, w } = this.layout[0]
      this.$refs.gridLayout.dragEvent(eventName, i, x, y, h, w)
      this.record()
    },
    record() {
      this.trigger.record(this.layout)
    },
    movedEvent() {
      console.log('movedEvent', this.layout);
      this.record()
    }
  }
}
</script>

<style scoped lang="less">
.vue-grid-item {
  background: #ccc;
  border: 1px solid #000;
}
.vue-draggable-handle {
  position: absolute;
  width: 60px;
  // height: 20px;
  top: 0;
  left: 0;
  line-height: px;
  padding: 4px;
  margin: 4px;
  background-color: #fff;
  border-radius: 4px;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}
</style>
