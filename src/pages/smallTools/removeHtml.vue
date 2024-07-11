<template>
  <div>
    <h4>去除标签</h4>
    <div>{{ htmlStr }}</div>
    <div>{{ removeHtml(htmlStr) }}</div>
  </div>
</template>

<script>
export default {
  name: 'removeHtml',
  components: {},
  props: {},
  data() {
    return {
      htmlStr: '<div><font color="#FF1A1A">华</font><font color="#FF1A1A">为</font>技术有限公司</div>',
    }
  },
  methods: {
    removeHtml(str) {
      const reTag = /<(?:.|\s)*?>/g
      return str.replace(reTag, '').replace(/&nbsp;/gi, '')
    },
  },
}
</script>

<style scoped lang="less"></style>
