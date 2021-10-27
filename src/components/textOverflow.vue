<template>
  <div ref="textBox" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
    <div class="textOverflow" :class="{'multiLine':lines!=='1'}" ref="textBoxWrap" :style="{width,'-webkit-line-clamp': lines!=='1'?lines: null}">
      <slot />
    </div>
    <el-tooltip class="item" ref="tooltip" effect="dark" :content="tooltipContent" placement="top" />
  </div>
</template>

<script>
function debounce(fn, time) {
  let timeout = null;
  return function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.call(this, e);
    }, time);
  };
}
export default {
  name: 'textOverflow',
  props: {
    lines: {
      type: String,
      default: '1'
    },
    width: {
      type: String
    }
  },
  data() {
    return {
      tooltip: true,
      tooltipContent: ''
    };
  },
  methods: {
    activateTooltip: debounce(tooltip => tooltip.handleShowPopper(), 50),
    mouseEnter() {
      const dom = this.$refs.textBoxWrap;
      // 获取渲染元素
      const range = document.createRange();
      range.setStart(dom, 0);
      range.setEnd(dom, dom.childNodes.length);

      const rangeRect = range.getBoundingClientRect();
      const domRect = dom.getBoundingClientRect();
      const rangeWidth = rangeRect.width;
      const domWidth = domRect.width;
      const rangeHeight = rangeRect.height;
      const domHeight = domRect.height;

      console.log('真实height', domHeight);
      console.log('渲染height', rangeHeight);
      console.log('真实width', domWidth);
      console.log('渲染width', rangeWidth);

      let show = () => {
        this.tooltip = true;
        // 添加tootip内容 设置tootip渲染
        this.tooltipContent = dom.innerText || dom.textContent;
        console.log(this.tooltipContent);
        window.dom = dom;
        const tooltip = this.$refs.tooltip;
        tooltip.referenceElm = dom;
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
        tooltip.doDestroy();
        tooltip.setExpectedState(true);
        this.activateTooltip(tooltip);
      };

      // if (rangeWidth + 10 < domWidth) {
      if (rangeHeight <= domHeight && rangeWidth <= domWidth) {
        this.tooltip = false;
      }
      else if (this.lines !== '1' && rangeHeight <= domHeight) {
        this.tooltip = false;
      } else {
        show();
      }
    },
    mouseLeave() {
      const tooltip = this.$refs.tooltip;
      if (tooltip) {
        tooltip.setExpectedState(false);
        tooltip.handleClosePopper();
      }
    }
  }
};
</script>

<style scoped lang="less">
.textOverflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.multiLine {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: unset;
}
.textOverflow--3 {
  -webkit-line-clamp: 3;
}
</style>
