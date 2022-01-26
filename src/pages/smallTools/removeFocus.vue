<template>
  <el-button @click="clickHandler">去除焦点色</el-button>
</template>

<script>
export default {
  name: 'removeFocus',
  components: {

  },
  props: {

  },
  data() {
    return {
    }
  },
  methods: {
    clickHandler(evt) {
      let target = evt.target;
      if (target.nodeName == 'SPAN') {
        target = evt.target.parentNode;
      }
      target.blur();
    }
  }
}
</script>

<style scoped lang="less">
</style>
