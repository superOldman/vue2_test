<template>
  <viewFullScreen class="test" :is-full-screen="isFullScreen2">
    <span @click='clickFullscreen'>全屏1</span>
    <span @click='isFullScreen2 = !isFullScreen2'>全屏2</span>
  </viewFullScreen>
</template>

<script>
import screenfull from './screenfull'
import viewFullScreen from '@/pages/screenfull/componentScreenfull/viewFullScreen'
export default {
  name: 'screenfull',
  components: {
    viewFullScreen
  },
  data() {
    return {
      isFullscreen: false,
      isFullScreen2: false
    }
  },
  methods: {
    clickFullscreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'you browser can not work',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>

<style scoped lang="less">
.test{
  background-color: #fff;
}
</style>