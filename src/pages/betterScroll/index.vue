<template>
  <div>
    <div class="wrap" ref="wrap">
      <ul class="items">
        <li class="item" v-for="(item,i) in 100" :key="i">{{i}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BetterScroll from 'better-scroll'
// let bs = new BetterScroll('.wrapper', {})
export default {
  data() {
    return {
      list: [
        { text: 'ssss' },
        { text: 'ssss' },
        { text: 'ssss' },
        { text: 'ssss' },
        { text: 'ssss' },
        { text: 'ssss' }
      ]
    }
  },
  mounted() {
    this.initScroll()
  },
  methods: {
    initScroll() {
      this.$nextTick(() => {
        // debugger
        const wrap = this.$refs.wrap
        const bs = new BetterScroll(wrap, {
          probeType: 3,
          click: true, // 设为 true 表示可以在的 div 里面 实现点击事件
          pullUpLoad: true // 表示上拉加载更多
        })
        console.log(bs)
      })
    }
  }
}
</script>
<style lang="css" scoped>
.wrap {
  width: 500px;
  height: 500px;
  border: 1px solid #000;
  overflow: auto;
}
.items {
  width: 100%;
}
.item {
  width: 100%;
}
.item:nth-child(2n) {
  background: #f2f2f2;
}
</style>