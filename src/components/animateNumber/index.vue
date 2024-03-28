<template>
  <div :style="{fontSize,fontWeight}">
    <span v-if="showAddOrSub">{{ counter>=0?'+':'-' }}</span><span @click="doClick">{{ realCounter }}</span>
  </div>
</template>

<script>
import { gsap, Power2 } from 'gsap'
import { toThousandsFilter } from '@/filters/index.js'
export default {
  name: 'AnimateNumber',
  props: {
    fontSize: String,
    fontWeight: String,
    number: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0.5
    },
    showAddOrSub: {
      type: Boolean,
      default: false
    },
    thousandsFilter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      counter: 0,
    }
  },
  computed: {
    realCounter() {
      const counter = Math.ceil(this.counter)
      return this.thousandsFilter ? toThousandsFilter(counter) : counter
    }
  },
  watch: {
    number: {
      deep: true,
      immediate: true,
      handler: function (val) {
        if (isNaN(val)) return
        gsap.to(this, { duration: this.duration, ease: Power2.easeInOut, counter: val })
      }
    }
  },
  methods: {
    doClick() {
      this.$emit("handleClick")
    }
  }
}
</script>

<style scoped lang="scss">
</style>
