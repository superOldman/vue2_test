<template>
  <div class="arrowsWrap">
    <div :class="{'arrow':show}" v-for="i in 5" :key="i">
      <div class="top"></div>
      <div class="bot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'arrows',
  data() {
      return {
          show: true
      }
  },
  mounted(){
      this.run()
  },
  methods: {
    run() {
      setTimeout(()=>{
          this.show = !this.show
          this.run()
      },500)
    }
  }
}
</script>
<style lang="css">
.arrowsWrap {
  display: flex;
}
.arrowsWrap>div{
    margin: 0 5px;
}
.arrow {
  
  opacity: 0;
}
.top,
.bot {
  width: 5px;
  height: 12px;
  background-color: bisque;
}
.top {
  transform: rotateZ(-23deg) translateY(1px);
}
.bot {
  transform: rotateZ(23deg) translateY(-1px);
}
.arrow:nth-child(1) {
  animation-name: my-animation;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
}
.arrow:nth-child(2) {
  animation-name: my-animation;
  animation-delay: 0.08s;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
}
.arrow:nth-child(3) {
  animation-name: my-animation;
  animation-delay: 0.18s;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
}
.arrow:nth-child(4) {
  animation-name: my-animation;
  animation-delay: 0.28s;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
}
.arrow:nth-child(5) {
  animation-name: my-animation;
  animation-delay: 0.38s;
  animation-duration: 0.1s;
  animation-fill-mode: forwards;
}

@keyframes my-animation {
  100% {
    opacity: 1;
  }
}
</style>








