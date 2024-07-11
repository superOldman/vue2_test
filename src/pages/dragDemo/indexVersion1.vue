<template>
  <div>
    <div>
      <el-button type="primary" @click="fixHandle">生成固定</el-button>
      <el-button type="primary" @click="randomHandle">生成随机</el-button>
    </div>
    <div class="drag-wrap clearFix">
      <div v-for="block in list" :key="block.id" class="t" :data-id="block.id" :style="{ width: block.width, height: block.height, background: block.bg }" @mouseenter="e => afterEnter(e, block.id)">
        <div class="drag-btn" @mousedown="e => aftermousedown(e, block.id)">拖动</div>
        <p>ID: {{ block.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Trigger from '@/pages/ctrlZ+Y/coreVersion2'
export default {
  name: 'indexVersion1',
  components: {},
  // mixins: [coreVersion2],
  props: {},
  data() {
    return {
      list: [
        // { width: '25%', height: '180px', id: '1', bg: '#e6a23c' },
        // { width: '25%', height: '180px', id: '2', bg: '#fef0f0' },
        // { width: '50%', height: '180px', id: '3', bg: '#67c23a' },
        // { width: '25%', height: '180px', id: '4', bg: '#3a8ee6' }
      ],
      placeholder: { width: '25%', height: '180px', id: 'x', bg: '#ccc' },
      isDrag: false,
      py: {
        left: 0,
        top: 0,
      },
      trigger: null,
    }
  },
  mounted() {
    this.initEvent()
    this.trigger = new Trigger(list => (this.list = list))
  },
  beforeDestroy() {
    this.removeEvent()
    this.trigger.removeEvent()
  },
  methods: {
    record(l) {
      this.trigger.record(l)
    },
    fixHandle() {
      this.list = [
        { width: '25%', height: '180px', id: 'fpsej0', bg: '#ce1b11' },
        { width: '25%', height: '180px', id: '6apsuf', bg: '#fb0e72' },
        { width: '25%', height: '180px', id: 'obtcep', bg: '#782066' },
        { width: '25%', height: '180px', id: 'uk98w3', bg: '#51330c' },
        { width: '25%', height: '180px', id: 'zfh6zz', bg: '#853e67' },
        { width: '25%', height: '180px', id: '59wqvs', bg: '#10b6d8' },
        { width: '25%', height: '180px', id: 'rnogav', bg: '#f06196' },
        { width: '25%', height: '180px', id: 'm0rne7', bg: '#8747a5' },
        { width: '25%', height: '180px', id: 'z86tis', bg: '#650872' },
        { width: '25%', height: '180px', id: 'lknf01', bg: '#7e73a1' },
      ]
      this.record(this.list)
    },
    randomHandle() {
      this.initData()
    },
    createId(prefix = '') {
      return prefix + Math.floor(Math.random() * 2147483648).toString(36)
    },
    createColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    initData() {
      this.list = []
      const widths = ['25%', '50%', '75%', '100%']
      const heights = ['180px', '360px']
      const len = Math.floor(Math.random() * 10) + 60
      for (let index = 0; index < len; index++) {
        this.list.push({
          width: widths[Math.floor(Math.random() * 1)],
          height: heights[Math.floor(Math.random() * 1)],
          id: this.createId(),
          bg: this.createColor(),
        })
      }
    },
    initEvent() {
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    removeEvent() {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    },
    mousemove(e) {
      if (this.isDrag && this.target) {
        const py = this.py
        this.move(this.target, e.pageX - py.left, e.pageY - py.top)
      }
    },
    mouseup(e) {
      const id = e.target.dataset.id
      this.isDrag = false
      if (this.target) {
        const targetid = this.target.dataset.id
        const imgIndex = this.list.findIndex(e => e.id == targetid)
        const img = this.list.find(e => e.id == targetid)
        this.list.splice(imgIndex, 1)
        const zwIndex = this.list.findIndex(e => e.id == 'x')
        this.list.splice(zwIndex, 1, img)

        this.target.style['pointer-events'] = null
        this.target.style['position'] = null
        this.target.style['left'] = null
        this.target.style['top'] = null
        this.target = null

        this.record(this.list)
      }
    },

    move(el, x, y) {
      el.style['pointer-events'] = 'none'
      el.style['position'] = 'absolute'
      el.style['left'] = x + 'px'
      el.style['top'] = y + 'px'
    },

    aftermousedown(e, id) {
      const index = this.list.findIndex(e => e.id === id)
      if (index !== -1 && !this.isDrag) {
        //
        const target = (this.target = e.target.parentNode)
        this.placeholder.width = this.list[index].width
        this.placeholder.height = this.list[index].height
        const py = this.py
        py.left = e.pageX - target.offsetLeft
        py.top = e.pageY - target.offsetTop
        this.list.splice(index, 0, this.placeholder)
        this.move(target, e.pageX - py.left, e.pageY - py.top)
        this.isDrag = true
      }
    },

    afterEnter(e, id) {
      // console.log(e);
      if (id == 'x') return
      if (this.isDrag) {
        const zwIndex = this.list.findIndex(e => e.id == 'x')
        const imgIndex = this.list.findIndex(e => e.id == id)
        this.list.splice(zwIndex, 1)
        this.list.splice(imgIndex, 0, this.placeholder)
      }
    },
  },
}
</script>

<style scoped lang="less">
.drag-wrap {
  position: relative;
  .drag-btn {
    padding: 4px 8px;
    margin: 8px;
    background-color: #fff;
    float: left;
    border-radius: 4px;
    cursor: pointer;
  }
}
.t {
  border-radius: 8px;
  float: left;
  background: #444;

  user-select: none;
}

.clearFix::after {
  content: '';
  display: block;
  clear: both;
}
</style>
