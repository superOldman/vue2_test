<template>
  <div class="changebtns">
    <div class="box1" :class="selected?'top':'bot'" @click="selected=true"></div>
    <div class="box2" :class="!selected?'top':'bot'" @click="selected=false"></div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {

  },
  data() {
    return {
      selected: true,
    }
  },
  computed: {

  },
  methods: {


  }
}
</script>

<style scoped lang="less">
.changebtns {
  width: 200px;
  position: relative;
  .box1 {
    width: 46px;
    height: 46px;
    background-color: royalblue;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
    transform: translateX(0px) scale(1);
    &.top {
      animation: leftTop 0.3s linear;
      animation-fill-mode: forwards;
    }
    &.bot {
      animation: leftBot 0.3s linear;
      animation-fill-mode: forwards;
    }
  }
  .box2 {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 30px;
    width: 46px;
    height: 46px;
    background-color: silver;
    border-radius: 50%;
    cursor: pointer;
    transform: translateX(0px) scale(0.9);
    &.top {
      animation: rightTop 0.3s linear;
      animation-fill-mode: forwards;
    }
    &.bot {
      animation: rightBot 0.3s linear;
      animation-fill-mode: forwards;
    }
  }
}

@keyframes leftTop {
  0% {
    transform: translateX(0px) scale(0.9);
    z-index: 1;
  }
  49% {
    transform: translateX(-10px) scale(0.95);
    z-index: 1;
  }
  51% {
    transform: translateX(-10px) scale(0.95);
    z-index: 2;
  }
  100% {
    transform: translateX(0px) scale(1);
    z-index: 2;
  }
}
@keyframes leftBot {
  0% {
    transform: translateX(0px) scale(1);
    z-index: 2;
  }
  49% {
    transform: translateX(-10px) scale(0.95);
    z-index: 2;
  }
  51% {
    transform: translateX(-10px) scale(0.95);
    z-index: 1;
  }
  100% {
    transform: translateX(0px) scale(0.9);
    z-index: 1;
  }
}
@keyframes rightTop {
  0% {
    transform: translateX(0px) scale(0.9);
    z-index: 1;
  }
  49% {
    transform: translateX(10px) scale(0.95);
    z-index: 1;
  }
  51% {
    transform: translateX(10px) scale(0.95);
    z-index: 2;
  }
  100% {
    transform: translateX(0px) scale(1);
    z-index: 2;
  }
}
@keyframes rightBot {
  0% {
    transform: translateX(0px) scale(1);
    z-index: 2;
  }
  49% {
    transform: translateX(10px) scale(0.95);
    z-index: 2;
  }
  51% {
    transform: translateX(10px) scale(0.95);
    z-index: 1;
  }
  100% {
    transform: translateX(0px) scale(0.9);
    z-index: 1;
  }
}
</style>
