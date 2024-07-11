<template>
  <div class="mainRight fx-c">
    <div class="dom1 fx-none"></div>
    <div class="fx-none" style="margin-bottom: 24px;">
      <el-button>下一頁</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flextest',
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang="less">
.fx {
  display: flex;
}
.fx-c {
  display: flex;
  flex-direction: column;
}
.fx-none {
  flex-grow: 0;
  flex-shrink: 0;
}
.fx-full {
  flex-grow: 1;
  flex-shrink: 1;
}
.fx-right {
  margin-left: auto;
}
.fx-bottom {
  margin-top: auto;
}

.mainRight {
  border: 1px solid red;
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow: auto;
  .dom1 {
    height: 1200px;
    border: 1px solid pink;
  }
}
</style>
