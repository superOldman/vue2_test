<template>
  <div>
    <viewFullScreen style="background:#fff" :is-full-screen="isFullScreen">
      <div>
        <el-button type="primary" @click="goHome">去首页</el-button>
        <el-button type="primary" @click="isEdit=!isEdit">{{isEdit?'保存':'编辑模式'}}</el-button>
        <el-button type="primary" @click="setBig">模拟模块改变</el-button>
        <el-button type="primary" @click="setBlock">模拟添加模块</el-button>
        <el-button type="primary" @click="setFullScreen">全屏</el-button>
        <el-button type="primary" @click="goBack">后退 </el-button>
        <el-button type="primary" @click="goForward">前进 </el-button>
      </div>
      <grid-layout ref="gridLayout" :layout.sync="layout" :col-num="8" :row-height="192" :is-draggable="isEdit" :is-resizable="true"
       :is-mirrored="false" :vertical-compact="true" :margin="[16, 16]"
        :use-css-transforms="true" :isResizable="false">
        <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" drag-allow-from=".vue-draggable-handle" drag-ignore-from=".no-drag"
          @moved="movedEvent">
          {{item.i}}
          <div class="vue-draggable-handle" v-if="isEdit">拖动</div>
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
import recorder from '@/pages/ctrlZ+Y/recorder'
export default {
  mixins: [recorder],
  name: 'editPane',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    viewFullScreen
  },
  props: {

  },
  data() {
    return {
      isEdit: false,
      isFullScreen: false,
      layout: [
        // { 'x': 0, 'y': 0, 'w': 2, 'h': 1, 'i': '0' },
        // { 'x': 2, 'y': 0, 'w': 2, 'h': 2, 'i': '1' },
        // { 'x': 4, 'y': 0, 'w': 2, 'h': 2, 'i': '2' },
        // { 'x': 6, 'y': 0, 'w': 2, 'h': 1, 'i': '3' },
        // { 'x': 0, 'y': 1, 'w': 2, 'h': 2, 'i': '4' },
        // { 'x': 2, 'y': 2, 'w': 2, 'h': 2, 'i': '5' }
      ]
    }
  },
  mounted() {
    // this.record(this.layout)
    this.initData()
  },
  methods: {
    createId(prefix = '') {
      return prefix + Math.floor(Math.random() * 2147483648).toString(36);
    },
    initData() {
      const { list, recorder } = this.$cache.local.getQueryParams() || {}
      // this.$cache.local.removeQueryParams()
      if (list) {
        this.layout = list
      } else {
        this.initLayout()
        this.record(this.layout)
      }
      recorder && this.setTwoList(...recorder)
    },
    initLayout() {
      this.layout = []
      const widths = ['2', '4', '6', '8']
      const heights = ['1', '2']
      const len = Math.floor(Math.random() * 10) + 60
      for (let index = 0; index < len; index++) {
        this.layout.push({
          w: +widths[Math.floor(Math.random() * 4)],
          h: +heights[Math.floor(Math.random() * 2)],
          i: this.createId(),
          x: 0,
          y: 0
        })
      }

    },
    goHome() {
      this.$cache.local.saveQueryParams({
        list: this.layout,
        recorder: this.getTwoList()
      })
      this.$router.push('screenfull')
    },
    setBlock() {
      var a = Math.max(...this.layout.filter(e => e.x == 0).map(e => e.y))

      var b = this.layout.find(e => e.y == a).h

      this.layout.push({ 'x': 0, 'y': a + b, 'w': 4, 'h': 2, 'i': new Date().getTime() })
      this.record()
    },
    setBig() {
      // eventName, id, x, y, h, w
      this.layout[0].y = Math.floor(Math.random() * 9) + 1
      const { eventName, i, x, y, h, w } = this.layout[0]
      this.$refs.gridLayout.dragEvent(eventName, i, x, y, h, w)
      this.record()
    },

    movedEvent() {
      console.log('movedEvent', this.layout);
      this.record()
    },
    setFullScreen() {
      this.isFullScreen = !this.isFullScreen
    }
  }
}
</script>

<style scoped lang="less">
.vue-grid-item {
  background: #ccc;
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





