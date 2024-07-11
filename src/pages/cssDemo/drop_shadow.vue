<template>
  <div>
    <div class="bg colorfulShadow"></div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang="less">
.bg {
  margin: 100px;
  width: 150px;
  height: 150px;
  background-image: url('~@/assets/logo.png');
  background-repeat: no-repeat;
  background-size: contain;
}

.colorfulShadow {
  position: relative;
}

.colorfulShadow::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: inherit;
  background-position: center center;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) blur(10px);
  z-index: -1;
  left: 0;
}
</style>
