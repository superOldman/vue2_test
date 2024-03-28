<template>
  <div class="svg-wrap">
    <div ref="container" style="width: 100%;height:100%;">
    </div>

    <el-popover placement="bottom" trigger="manual" :visible-arrow="false" :content="content" v-model="visible" popper-class="d3-scale-percent">
      <div class="btn" slot="reference" @click="visible = !visible"></div>
    </el-popover>
  </div>
</template>

<script>
import data from './mock/data'
// import { createNode, createResource } from '@/pages/D3/D3tree'
import { D3Tree } from '@/pages/D3/D3tree2'
export default {
  name: 'd3_collapsibleTree_test',
  components: {

  },
  props: {

  },
  data() {
    return {
      visible: false,
      content: '100%'
    }
  },
  mounted() {
    D3Tree.prototype.emit = this.percentHandle
    const tree = new D3Tree(this.$refs.container)
    tree.create(data.Result)

  },
  methods: {
    percentHandle(scale) {
      this.visible = true
      this.content = Math.floor(scale * 100) + '%'
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.visible = false
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
.svg-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .btn {
    position: absolute;
    left: 50%;
    bottom: 100px;
  }
}

::v-deep .d3-scale-percent {
  width: 90px;
  min-width: 0px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
}
</style>
<style>
.d3-scale-percent {
  width: 60px;
  min-width: 0px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  height: 30px;
  line-height: 30px;
  padding: 0;
  text-align: center;
  border-radius: 4px;
  border: none;
}
</style>
