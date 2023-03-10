<template>
  <div id="box">
    <canvas></canvas>
  </div>
</template>

<script>
import tuzi from '@/assets/下载.png'
import tuzi2 from '@/assets/tuzi.png'
import logo from '@/assets/logo.png'
// import hero from '@/assets/hero.png'
import hero from '@/assets/woman.png'
export default {
  name: '',
  components: {

  },
  props: {

  },
  data() {
    return {
      img: tuzi2,
      img2: logo,
      hero: hero,

      canvas: null,
      box: null,
      ctx: null,
      manBg: null,

      manSize: {
        x: 32,
        y: 48
      },

      imageX: 0,
      imageY: 0,

      manX: 0,
      manY: 0,
      speed: 5,
      turnUplength: 16,
      turnDownlength: 32,
      maxRect: {
        w: 128,
        h: 192
      },

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      this.map()
      this.initPeople()
      this.control()
    },
    map() {
      this.canvas = document.querySelector('canvas')
      this.canvas.width = 1000
      this.canvas.height = 500
      this.box = document.querySelector('#box')
      this.ctx = this.canvas.getContext('2d')
    },
    initPeople() {
      const image = new Image()
      image.src = this.hero
      this.manBg = image
      const self = this
      image.onload = function () { self.drawPeople('d', 0) }
    },
    /*
    * direction 方向
    * imgPos 图片的位置 从0开始
    */
    drawPeople(direction, imgPos) {
      const directionList = {
        u: 96,
        d: 0,
        l: 32,
        r: 64
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      //  前四个值指的是图片 后四个是画布的位置
      // self.ctx.drawImage(image, 0, 0, 32, 48, 0, 0, 32, 48)
      this.ctx.drawImage(this.manBg,
        directionList[direction] + imgPos * this.manSize.x,
        directionList[direction], this.manSize.x, this.manSize.y, this.manX, this.manY, this.manSize.x, this.manSize.y)
    },
    control() {
      window.addEventListener('keydown', (e) => {
        console.log(e)
        if (e.code === 'ArrowLeft') {
        }
        else if (e.code === 'ArrowUp') {

        }
        else if (e.code === 'ArrowDown') {

          if (this.imageX > 2) {
            this.imageX = 0
          } else {
            this.imageX++
          }

          if (this.manX > 0) {
            this.manX = this.manX - this.speed
          } else {
            this.manX = 0
          }
          this.drawPeople('d', this.imageX)
        }
        else if (e.code === 'ArrowRight') {
        }
      })
    },

    // 翻转
    t() {
      // self.ctx.save();
      // self.ctx.translate(300 + self.imageX * 2, 0);
      self.ctx.scale(-1, 1)
      self.ctx.drawImage(image, self.imageX, 0, self.manSize, self.manSize, 0, 0, self.manSize, self.manSize)
      // self.ctx.translate(-(210 + self.imageX * 2), 0);

      // self.ctx.restore();


      // self.ctx.save();
      // let x = self.now + self.manSize / 2;
      // self.ctx.translate(x, 0);
      // self.ctx.scale(-1, 1);
      // self.ctx.translate(-x, 0);
      // self.ctx.drawImage(image, self.imageX, 0, self.manSize, self.manSize, 0, 0, self.manSize, self.manSize)

      // self.ctx.drawImage(this.texture, self.now, this.y);
      // self.ctx.restore();
    }
  }
}
</script>

<style scoped lang="less">
#box {
  position: relative;
  width: 100%;
  height: 100%;
  canvas {
    display: block;
  }
}
.bubble {
  position: absolute;
}
</style>
