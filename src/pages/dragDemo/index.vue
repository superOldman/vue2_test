<template>
  <div class="drag-wrap clearFix">
    <div
      v-for="block in list"
      :key="block.id"
      class="t"
      :data-id="block.id"
      :style="{ width: block.width, height: block.height, background: block.bg }"
      @mousedown="e => aftermousedown(e, block.id)"
    ></div>
    <div class="coverage clearFix" v-show="coverageShow">
      <div v-for="(block, i) in coverageList" :key="i" class="coverage-block" :style="{ opacity: block.bg }" @mouseenter="e => afterEnter(e, i)" @mouseleave="e => afterLeave(e, i)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
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
      coverageList: [],

      coverageShow: false,
    }
  },
  mounted() {
    this.initData()
    this.$nextTick(() => {
      this.initEvent()
    })
  },
  methods: {
    createId(prefix = '') {
      return prefix + Math.floor(Math.random() * 2147483648).toString(36)
    },
    createColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    },
    initData() {
      const widths = ['25%', '50%', '75%', '100%']
      const heights = ['180px', '90px']
      const len = Math.floor(Math.random() * 10) + 6
      for (let index = 0; index < len; index++) {
        this.list.push({
          width: widths[Math.floor(Math.random() * 1)],
          height: heights[Math.floor(Math.random() * 2)],
          id: this.createId(),
          bg: this.createColor(),
        })
      }
    },
    initBlock() {},
    initEvent() {
      this.wrap = document.querySelector('.drag-wrap')

      const height = this.wrap.offsetHeight
      const lines = height / 90
      for (let index = 0; index < lines * 4; index++) {
        this.coverageList.push({ bg: '' })
      }
      document.addEventListener('mousemove', e => {
        if (this.isDrag && this.target) {
          const py = this.py
          this.move(this.target, e.pageX - py.left, e.pageY - py.top)
        }
      })
      document.addEventListener('mouseup', e => {
        const id = e.target.dataset.id
        this.isDrag = false
        this.coverageShow = false

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
          this.target.style['z-index'] = null
          this.target.style['opacity'] = null

          this.target = null
        }
      })
    },

    move(el, x, y) {
      el.style['pointer-events'] = 'none'
      el.style['position'] = 'absolute'
      el.style['left'] = x + 'px'
      el.style['top'] = y + 'px'
      el.style['z-index'] = 2
      el.style['opacity'] = 0.9
    },

    aftermousedown(e, id) {
      const index = this.list.findIndex(e => e.id === id)
      if (index !== -1 && !this.isDrag) {
        const target = (this.target = e.target)
        this.placeholder.width = this.list[index].width
        this.placeholder.height = this.list[index].height
        const py = this.py
        py.left = e.pageX - target.offsetLeft
        py.top = e.pageY - target.offsetTop
        this.list.splice(index, 0, this.placeholder)
        this.move(target, e.pageX - py.left, e.pageY - py.top)
      }
      this.isDrag = true
      this.coverageShow = true
    },
    afterLeave(e, i) {
      this.coverageList[i].bg = 0
    },
    afterEnter(e, i) {
      // if (id == 'x') return
      // if (this.isDrag) {
      //   const imgIndex = this.list.findIndex(e => e.id == id)
      //   const zwIndex = this.list.findIndex(e => e.id == 'x')
      //   this.list.splice(zwIndex, 1)
      //   this.list.splice(imgIndex, 0, this.placeholder)
      // }
      // console.log(222);

      if (this.isDrag) {
        this.coverageList[i].bg = 0.5
        // const imgIndex = this.list.findIndex(e => e.id == id)
        // const zwIndex = this.list.findIndex(e => e.id == 'x')
        // this.list.splice(zwIndex, 1)
        // this.list.splice(imgIndex, 0, this.placeholder)
      }
    },
    afterEnter2(e, i) {
      // console.log(333);

      if (this.isDrag) {
        this.coverageList[i].bg = 'rgba(0, 0, 0, 0.8);'

        // const imgIndex = this.list.findIndex(e => e.id == id)
        // const zwIndex = this.list.findIndex(e => e.id == 'x')
        // this.list.splice(zwIndex, 1)
        // this.list.splice(imgIndex, 0, this.placeholder)
      }
    },
  },
}
</script>

<style scoped lang="less">
.drag-wrap {
  // display: flex;
  // flex-wrap: wrap;
  position: relative;
  .coverage {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
}
.t {
  border-radius: 8px;
  float: left;
  user-select: none;
}
.coverage-block {
  width: 25%;
  height: 90px;
  background-color: #000;
  opacity: 0;
  // border-radius: 8px;
}

.clearFix::after {
  display: block;
  content: '';
  clear: both;
}
</style>
