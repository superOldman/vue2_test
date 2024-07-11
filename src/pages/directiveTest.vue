<template>
  <div>
    <!-- <input type="text" v-model="a" />
    <br />
    <input type="text" v-model="a" v-focus2 />
    <br />
    <input type="text" v-model="a" v-focus />

    <div class="textBox" v-textOverflow>
      是大法师打
      是大法师打发
      是大法师打发
      是大法师打发
      是大法师打发
      是大法师打发
    </div>
    <div class="textBox" v-textOverflow>
      是大法师打
    </div> -->

    <!-- <text-overflow width="1000px">
      <el-input v-model="text" autocomplete="off" :title="text" />
    </text-overflow> -->

    <el-input v-model="text2" type="textarea" :rows="6" autocomplete="off" :title="text" />

    <el-button @click="text = 'dsafa'">少字</el-button>
    <el-button @click="text = aaa">多字</el-button>
    <el-button @click="text = aaa2">多字少于三行</el-button>
    <el-button @click="text = good">==</el-button>
    <el-button @click="text = more1">多1</el-button>

    <div class="textBox" id="box">
      <text-overflow lines="1">{{ text }}</text-overflow>
    </div>
    <!-- <el-tooltip :disabled='true' content="3" placement="top" effect="light">
      <span ref="span" class="textOverflow">{{3}}</span>
    </el-tooltip> -->
  </div>
</template>

<script>
import textOverflow from '@/components/textOverflow.vue'
export default {
  components: { textOverflow },
  data() {
    return {
      a: 0,
      text: 'dsafa',
      text2: 'dsafa\ndfsgasdgf',
      aaa: `毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付大法师打发是大法师打发是大法师打发是大法师打发是大法师
      `,
      aaa2: '毒贩夫妇付付付付付付付付付付付付付付付付付付付付付付',
      good: '毒贩夫妇付付付付付付付付付付付付付付付付付付付付付1付1',
      more1: '毒贩夫妇付付付付付付付付付付付付付付付付付付付付付1付11',
    }
  },

  created() {},
  watch: {},
  // 局部自定义指令指令
  directives: {
    focus2: {
      // 指令的定义
      inserted: function(el) {
        el.focus()
      },
    },
    demo: {
      bind: function(el, binding, vnode) {
        el.innerHtml = `name: ${binding.name}
        ${vnode}
        `
      },
    },
  },
  mounted() {
    this.computedWidth()
  },
  methods: {
    //     // 判断是否text-overflow, 如果是就显示tooltip
    // const cellChild = event.target.querySelector('.cell');
    // if (!(hasClass(cellChild, 'el-tooltip') && cellChild.childNodes.length)) {
    //   return;
    // }
    // // use range width instead of scrollWidth to determine whether the text is overflowing
    // // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
    // const range = document.createRange();
    // range.setStart(cellChild, 0);
    // range.setEnd(cellChild, cellChild.childNodes.length);
    // const rangeWidth = range.getBoundingClientRect().width;
    // const padding = (parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) +
    //   (parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0);
    // if ((rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) && this.$refs.tooltip) {
    //   const tooltip = this.$refs.tooltip;
    //   // TODO 会引起整个 Table 的重新渲染，需要优化
    //   this.tooltipContent = cell.innerText || cell.textContent;
    //   tooltip.referenceElm = cell;
    //   tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
    //   tooltip.doDestroy();
    //   tooltip.setExpectedState(true);
    //   this.activateTooltip(tooltip);
    // }
    computedWidth() {
      const dom = document.querySelector('#box')
      const range = document.createRange()
      range.setStart(dom, 0)
      range.setEnd(dom, dom.childNodes.length)
      const rangeWidth = range.getBoundingClientRect().width
      // const domWidth = dom.getBoundingClientRect().width
      // if (domWidth < rangeWidth) {

      // }
      // console.log(rangeWidth, rangeWidth2)
    },
  },
}
</script>

<style>
.textBox {
  width: 300px;
}
</style>
