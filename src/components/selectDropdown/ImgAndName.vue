<template>
  <div>
    <div v-if="preview == 5 || preview == 6" class="imgNameWrap-24 fx-s-center">
      <div class="pictureWrap-24 fx-s-center" :class="{ insHeaderImg: preview == 4 }">
        <div class="mr-8">
          <div class="picture" :class="{ 'br-50': preview != 2 || preview != 3 }">
            <img v-if="photo" :src="base64addHead(photo)" alt="" srcset="" class="photo" />
            <span v-else class="strPhoto">{{ firstStr(text) }}</span>
          </div>
          <img :src="imgLogo" alt="" srcset="" class="overLogo" />
        </div>
        <text-overflow>{{ text }}</text-overflow>
      </div>
      <div class="fx-full"></div>
      <div v-if="date && preview != 4" class="date">{{ date }}</div>
    </div>

    <div v-else class="imgNameWrap fx">
      <div class="pictureWrap fx-none">
        <div class="picture" :class="{ 'br-50': preview == 4 || preview == 1 }" :style="{ height: height + 'px', 'line-height': height + 'px', width: height + 'px' }">
          <img v-if="photo" :class="{ 'br-4': preview == 2 || preview == 3 }" :src="base64addHead(photo)" alt="" srcset="" class="photo" />
          <span v-else class="strPhoto">{{ firstStr(text) }}</span>
        </div>
        <img :src="imgLogo" alt="" srcset="" class="overLogo" />
      </div>
      <!-- :style="{width:detailWidth}" -->
      <div class="detial fx-c fx-p-center fx-full">
        <div :class="[{ text: !textScond }, { 'text_2 text-class': textScond }]">
          <text-overflow>{{ text }}</text-overflow>
        </div>
        <div v-if="date && preview != 4" class="fx-full"></div>
        <div v-if="textScond" class="textScond" :title="textScond">
          <text-overflow>{{ textScond }}</text-overflow>
        </div>
        <div v-if="date && preview != 4" class="date">{{ date }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    photo: {
      type: String,
      default: '',
    },
    preview: {
      type: Number | String,
      default: undefined,
    },
    imgLogo: '',
    textScond: {
      type: String,
      default: '',
    },
    text: '',
    date: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: 40,
    },
  },
  computed: {
    lineHeight() {
      let lh = '40px'
      if (this.height && this.textScond) {
        lh = this.height / 2 + 'px'
      } else if (this.height) {
        lh = this.height + 'px'
      }
      return lh
    },
    // detailWidth() {
    //   return `calc(100% - 10px - ${this.height}px)`
    // }
  },
  mounted() {},
  methods: {
    base64addHead(val) {
      if (val) {
        if (val.startsWith('http') || val.startsWith('data')) {
          return val
        } else {
          if (val == '/static/assets/defaultface.png') {
            return val // 处理默认头像的相对位置修改
          }
          return 'data:image/jpeg;base64,' + val
        }
      }
      // return '/static/assets/defaultface.png'
      return false
    },
    firstStr(str) {
      return str && str.charAt(0)
    },
  },
}
</script>
<style lang="less" scope>
.br-50 {
  border-radius: 50%;
}
.br-4 {
  border-radius: 4px;
}
.imgNameWrap-24 {
  padding: 8px 16px 16px;
  .pictureWrap-24 {
    position: relative;
    .picture {
      // border-radius: 50%;
      width: 24px;
      height: 24px;
      overflow: hidden;
      font-size: 0;
      .photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .strPhoto {
        font-size: 24px;
        font-weight: 600;
        display: block;
        line-height: inherit;
        text-align: center;
        width: 100%;
        height: 100%;
        background-color: #fcb440;
        border-radius: 50%;
      }
    }
    .overLogo {
      width: 15px;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
.imgNameWrap {
  position: relative;
  .insHeaderImg {
    border-top: 2px solid #5033e8;
    border-right: 2px solid #e03165;
    border-bottom: 2px solid #fcb440;
    border-left: 2px solid #f85031;
    border-radius: 50%;
  }
  .pictureWrap {
    position: relative;
    .picture {
      // border-radius: 50%;
      width: 40px;
      height: 40px;
      overflow: hidden;
      font-size: 0;
      .photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .strPhoto {
        font-size: 24px;
        font-weight: 600;
        display: block;
        line-height: 24px;
        text-align: center;
        line-height: inherit;
        text-align: center;
        width: 100%;
        height: 100%;
        background-color: #fcb440;
        border-radius: 50%;
      }
    }
    .overLogo {
      width: 15px;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
  .detial {
    float: left;

    margin-left: 12px;
    position: relative;
    text-align: left;

    .text {
      line-height: 24px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
    .text_2 {
      line-height: 20px;
      height: 20px;
    }

    .textScond {
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .date {
    font-size: 12px;
    line-height: 20px;
    color: #747474;
    // position: absolute;
    // top: 0;
    // right: 0;
  }
}

.text-class {
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  color: #333;
}
</style>
