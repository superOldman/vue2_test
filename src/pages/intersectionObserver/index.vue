<template>
  <div class="wrap">
    <Skeleton ref="skeleton" v-for="(item,i) in options" :key="i" class="item-block" @update="updateHandle(item)">
      {{item.label}}
    </Skeleton>
  </div>
</template>

<script>
import observer from './mixins/observer.js'
import Skeleton from './skeleton.vue'
export default {
  name: '',
  mixins: [observer],
  components: {
    Skeleton
  },
  props: {
  },
  data() {
    return {
      options: [
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
        { label: '无无无无无无无无无无无无无无' },
      ]
    }
  },
  mounted() {
    this.initObserve(null, this.$refs.skeleton.map(e => e.$el))
  },
  methods: {
    updateHandle(item) {
      const len = Math.random() * 1000
      let label = '加载'
      for (let index = 0; index < len; index++) {
        label += '加载'
      }
      item.label = label
    }
  }
}
</script>

<style scoped lang="less">
.wrap {
  width: 600px;
  height: 800px;
  margin: 0 auto;
  background: #b2b3b3;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  .item-block {
    // width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    margin: 8px;
    background-color: aquamarine;
    margin-bottom: 24px;
  }
}
</style>