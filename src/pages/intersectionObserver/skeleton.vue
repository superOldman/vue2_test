<template>
  <div class="over-flow" :style="{ height }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'MySkeleton',
  data() {
    return {
      height: '150px',
    }
  },
  methods: {
    update() {
      this.height = null
      this.$emit('update')
    },
  },
}
</script>

<style scoped lang="less">
.over-flow {
  overflow: hidden;
}
</style>
