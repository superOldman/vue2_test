<template>
  <div>
    <h5>{{ title || 1 }}</h5>
    <p>{{ content }}</p>
    <button @click="del">全局</button>
    <button @click="setData">触发函数</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '标题',
      content: '内容',
    }
  },
  props: ['t', 'c', 'gai'],
  methods: {
    setData() {
      this.$emit('homeFn2', '子组件的数据', '子组件的数据2')
    },
    del() {
      // this.$delete(this.title)
      // 创建全局方法
      console.log('this.$root', this.$root.$emit)
      this.$root.$emit('test')
    },
  },
  watch: {
    t: {
      handler(val) {
        this.title = val
      },
    },
    c: {
      handler(val) {
        this.content = val
      },
    },
  },
}
</script>
<style></style>
