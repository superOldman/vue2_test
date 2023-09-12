<template>
  <div :style="style" :class="{[fullScreenCls]:isFullScreen}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'view-full-screen',
  props: {
    isFullScreen: {
      type: Boolean,
      default: false
    },
    fullScreenCls: {
      type: String,
      default: ''
    }
  },
  watch: {
    isFullScreen: {
      handler: function () {
        this.$nextTick(() => {
          this.updateView();
        });
      },
      immediate: true
    }
  },
  computed: {
    style() {
      if (!this.isFullScreen || this.fullScreenCls) {
        return {}
      }
      return {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: '100vm',
        height: ' 100vh'
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKeyDown)
  },
  methods: {
    updateView() {
      if (!this.parentNode) {
        this.parentNode = this.$el.parentNode
      }
      if (this.isFullScreen) {
        this.$message('按Exc退出全屏');
        document.querySelector('#app').appendChild(this.$el)
      } else {
        this.$el.remove()
        this.parentNode.appendChild(this.$el)
      }
    },

    onKeyDown(e) {
      if (this.isFullScreen && e.key === 'Escape') {
        this.$parent.setFullScreen()
      }
    }
  },

  beforeDestroy() {
    if (this.isFullScreen) {
      document.querySelector('#app').removeChild(this.$el);
      this.parentNode = undefined
    }
    window.removeEventListener('keydown', this.onKeyDown)
  }
}
</script>

<style scoped>
</style>