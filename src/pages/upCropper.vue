<template>
  <!--     :fixed-box="false" :fixed="option.fixed" :fixedNumber="false" -->
  <el-dialog class="editorAutoEdm" width="500" :visible.sync="showDialog" :before-close="handleClose" :close-on-click-modal="false">
    <!-- <vue-cropper2 ref="cropper2" :view-mode="2" drag-mode="crop" :min-container-width="300" :background="true" :rotatable="true" :src="imgSrc" alt="Source Image"
      :img-style="{ width: '100%', height: '400px' }"  />

    div -->
    <vueCropper ref="cropper" :img="imgSrc" :outputSize="option.size" :outputType="option.outputType" :centerBox="true" :autoCrop="true" :fixed="option.fixed" :fixedNumber="option.fixedNumber"
      :style="{ width: '100%', height: '400px' }" :key="key"></vueCropper>
    <div>

      <el-button @click="setSize1">自由截图</el-button>
      <el-button @click="setSize2">1:1</el-button>
      <el-button @click="setSize3">4:3</el-button>
      <el-button @click="setSize4">16:9</el-button>
      <el-button @click="setSize5">21:9</el-button>
      <div></div>
      <el-button @click="cropStart">截图</el-button>
    </div>
    <!-- <vue-cropper ref="cropper" :src="imgSrc" alt="Source Image"></vue-cropper> -->
  </el-dialog>
</template>

<script>
import img from '@/assets/logo.png'
import { VueCropper } from 'vue-cropper' // https://github.com/xyxiao001/vue-cropper
// import VueCropper2 from 'vue-cropperjs'
// import 'cropperjs/dist/cropper.min.css';

export default {
  name: '',
  components: {
    VueCropper,
    // VueCropper2,
  },
  props: {
    // imgSrc: String
  },
  data() {
    return {
      showDialog: false,
      imgSrc: img,
      key: 0,
      option: {
        size: 1,
        outputType: 'png',
        fixed: false,
        fixedNumber: [1, 1]
      }
    }
  },
  inject: [ 'a' ],
  mounted() {
  },
  methods: {
    setSize1() {

      this.option.fixed = false
      // this.option.fixedNumber = [4, 3]
      this.$refs.cropper.refresh()
    },
    setSize2() {

      this.option.fixed = true
      this.option.fixedNumber = [1, 1]
      this.$refs.cropper.refresh()
    },
    setSize3() {

      this.option.fixed = true
      this.option.fixedNumber = [4, 3]
      // this.key++
      this.$refs.cropper.refresh()
    },
    setSize4() {

      this.option.fixed = true
      this.option.fixedNumber = [16, 9]
      // this.key++
      this.$refs.cropper.refresh()
    },
    setSize5() {
      this.option.fixed = true
      this.option.fixedNumber = [21, 9]
      // this.key++
      this.$refs.cropper.refresh()

    },

    cropStart() {
      this.$refs.cropper.getCropBlob((data) => {
        // do something
        console.log(data)
      })

      // 获取截图的base64 数据
      // this.$refs.cropper.getCropData((data) => {
      //   // do something
      //   console.log(data)
      // })
    },
    show(obj) {
      this.showDialog = true
      const dataURL = URL.createObjectURL(obj)
      this.imgSrc = dataURL
    },
    handleClose() {
      this.showDialog = false
    }
  },
};
</script>

<style scoped lang="less">
</style>
