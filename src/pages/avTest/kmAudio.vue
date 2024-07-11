<template>
  <div>
    <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
    <audio
      style="display:none"
      :src="src"
      controls="controls"
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @ended="onEnded"
      @volumechange="onVolumechange"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
    ></audio>
    <!-- 音频播放控件 -->
    <div>
      <el-link :underline="false" style="font-size:48px" @click="startPlayOrPause">
        <i v-if="audio.playing" class="el-icon-video-play"></i>
        <i v-else class="el-icon-video-pause"></i>
      </el-link>
      <div>{{ realFormatSecond(audio.currentTime) }}/{{ realFormatSecond(audio.maxTime) }}</div>
      <!-- 进度条ui -->
      <el-slider ref="slider" v-model="sliderTime" :format-tooltip="formatProcessToolTip" :step="1" :max="audio.maxTime" @input="getFirstValue" @change="changeCurrentTime"></el-slider>

      <el-popover placement="top" width="28" trigger="hover" popper-class="km-popper">
        <!-- 音量进度条 -->
        <el-slider v-model="audio.volume" :step="1" height="100px" vertical @change="changeVolume"></el-slider>
        <!-- 音量 -->
        <div slot="reference" style="wdith:28px">
          <el-link :underline="false" @click="setMuted" style="font-size:20px">
            <i v-if="audio.muted" class="el-icon-turn-off-microphone"></i>
            <i v-else class="el-icon-microphone"></i>
          </el-link>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'kmkAudio',
  props: {
    src: {
      type: String,
      default: '张叶蕾-还是分开.mp3',
    },
  },
  data() {
    return {
      sliderTime: 0,
      sliderVolume: 100,
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        volume: 0,
        muted: false,

        firstValue: 0,
        moveEv: false,
      },
    }
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play()
    },
    setMuted() {
      this.audio.muted = !this.audio.muted
      this.$refs.audio.muted = this.audio.muted
    },
    // 播放音频
    play() {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause()
    },
    ended() {
      this.$refs.audio.ended()
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false
    },
    onEnded() {
      this.audio.playing = false
    },

    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      console.log('loadedmetadata')
      console.log(res)
      this.audio.maxTime = parseInt(res.target.duration)
      this.audio.volume = parseInt(res.target.volume * 100)
    },

    getFirstValue() {
      const slider = this.$refs.slider
      if (slider.dragging) {
        this.audio.moveEv = true
        this.audio.firstValue = slider.firstValue
      }
    },

    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      if (this.audio.moveEv) {
        this.$refs.audio.currentTime = this.audio.firstValue
        this.audio.moveEv = false
      } else {
        this.$refs.audio.currentTime = index
        this.audio.moveEv = false
      }
    },
    changeVolume(index) {
      this.$refs.audio.volume = index / 100
    },
    // 当音频当前时间改变后，进度条也要改变
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime
      this.sliderTime = res.target.currentTime
    },
    onVolumechange(res) {
      console.log(res)
      this.audio.muted = res.target.muted || !res.target.volume
      this.audio.volume = parseInt(res.target.volume * 100)
    },
    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      // index = parseInt(this.audio.maxTime / 100 * index)
      return '进度条: ' + this.realFormatSecond(index)
    },

    // 将整数转换成 时：分：秒的格式
    realFormatSecond(second) {
      var secondType = typeof second
      if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second)
        var hours = Math.floor(second / 3600)
        second = second - hours * 3600
        var mimute = Math.floor(second / 60)
        second = second - mimute * 60
        return hours ? hours + ':' : '' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      } else {
        return '0:00:00'
      }
    },
  },
}
</script>

<style>
.km-popper {
  min-width: 0;
  padding: 12px 0;
}
.km-popper .el-slider.is-vertical .el-slider__runway {
  margin: 0px 10px;
}
</style>
