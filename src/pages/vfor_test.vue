<template>
  <div class="bag" @click="chilkHandle">
    <img v-if="!showOpen" src="@/assets/chou/r.png" alt="" srcset="">
    <img v-else src="@/assets/chou/t.png" alt="" srcset="">
    <div class="start" ref="box"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showOpen: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.showOpen = true;
      this.runAnimate();
    });
  },
  methods: {
    runAnimate() {
      let amount = 5;
      let w = 980;
      let h = 600;
      let width = w / amount;
      let height = h / amount;
      let y = 0;
      let index = 1;
      for (let z = 0; z <= (amount * width); z = z + width) {
        let img = document.createElement('img');
        img.src = require('@/assets/chou/jb' + index + '.png');
        this.$refs.box.appendChild(img);
        if (z === (amount * width) - width) {
          y = y + height;
          z = -width;
        }
        if (index >= 5) {
          index = 1;
        }
        index++;
        if (y === (amount * height)) {
          z = 9999999;
        }
      }
      function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      this.$nextTick(() => {
        let a = this.$refs.box.children;
        let first = true;
        let self = this;
        for (let i = 0; i < a.length; i++) {
          let v = rand(120, 90),
            angle = rand(80, 89),
            theta = (angle * Math.PI) / 180,
            g = -9.8;
          let t = 0, z, speed = 0.10, nx, ny, totalt = 10;
          let negate = [1, -1, 0],
            direction = negate[Math.floor(Math.random() * negate.length)];

          let randDeg = rand(-5, 10),
            randScale = rand(0.9, 1.1),
            randDeg2 = rand(30, 5);

          a[i].style.transform = 'scale(' + randScale + ') skew(' + randDeg + 'deg) rotateZ(' + randDeg2 + 'deg)';

          // Set an interval
          z = setInterval(function () {
            let ux = (Math.cos(theta) * v) * direction;
            let uy = (Math.sin(theta) * v) - ((-g) * t);
            nx = (ux * t);
            ny = (uy * t) + (0.25 * (g) * Math.pow(t, 2));
            if (ny < -40) {
              ny = -40;
            }
            a[i].style.bottom = (ny) + 'px';
            a[i].style.left = (nx) + 'px';

            t = t + speed;
            if (t > totalt) {
              if (first) {
                first = false;
                self.$alert('这是一段内容', '标题名称', {
                  confirmButtonText: '确定',
                  callback: () => {
                    self.$emit('hideMe');
                  }
                });
              }
              clearInterval(z);
            }
          }, 20);

        }

      });
    },
    chilkHandle() {
      this.showOpen = true;
      this.fn();
    }
  }

};
</script>

<style lang="less">
.bag {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  width: 139px;
}
.start {
  position: relative;
  top: -30px;
  left: 68px;
  > img {
    position: absolute;
  }
}
</style>