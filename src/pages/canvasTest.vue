<template>
  <div>
    canvas

    <!-- <img :src="img" alt="" srcset=""> -->
    <div id="box"></div>
  </div>
</template>

<script>
import tuzi from '@/assets/下载.png'
import tuzi2 from '@/assets/tuzi.png'
import logo from '@/assets/logo.png'
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
    }
  },
  mounted() {
    let canvas = document.createElement('canvas');
    let box = document.querySelector('#box');
    let ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = this.img
    const logo = this.img2
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      box.appendChild(canvas)
      let imageData = ctx.getImageData(0, 0, image.width, image.height).data;

      console.log(imageData)
      // ctx.fillStyle = "#fff";
      // ctx.fillRect(0, 0, image.width, image.height);

      let gap = 3;
      var dragonScale = 2;

      for (let h = 0; h < image.height; h += gap) {
        for (let w = 0; w < image.width; w += gap) {
          let position = (image.width * h + w) * 4;
          let r = imageData[position], g = imageData[position + 1], b = imageData[position + 2];

          if (r + g + b !== 0) {
            // ctx.fillStyle = "#000";
            // ctx.fillRect(w, h, 2, 2);

            let bubble = document.createElement("img");
            bubble.src = logo;
            bubble.style.position="absolute"
            bubble.setAttribute("class", "bubble");

            let bubbleSize = Math.random() * 10 + 1;
            bubble.style.left = (w * dragonScale - bubbleSize / 2) + "px";
            bubble.style.top = (h * dragonScale - bubbleSize / 2) + "px";
            bubble.style.width = bubble.style.height = bubbleSize + "px";
            bubble.style.animationDuration = Math.random() * 6 + 4 + "s";

            box.appendChild(bubble);


          }
        }
      }


    }

  },
  methods: {

  },
};
</script>

<style scoped lang="less">
#box{
  position: relative;
}
.bubble {
  position: absolute;
}
</style>
