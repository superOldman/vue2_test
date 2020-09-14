<template>
  <div>
    <h1 class="sty">home</h1>



    <div >
      <div>主页数据：{{homeData}}</div>
    </div>
    <child ref="child" :title="block.title" ></child>
    <!--<div v-show="divshow" ref="show">zai</div>-->
    <!-- <button ref="btn" style="width:200px" @click="homeclick">11111</button> -->
    <!--<div>--------------------------</div>
    <button @click="t = 111">改内容</button>
    <button @click="b1 = !b1">hide-if</button>
    <button @click="b2 = !b2">hide-show</button>
    <block :t="t" :c="c" v-if="b1"></block>
    <block :t="t" :c="c" v-show="b2"></block> -->
    <block @homeFn2="homeFn" ></block>
  </div>
</template> 
<script>

// import child from "../components/child.vue";
// import block from "../components/block.vue";
const block = () => import("../components/block.vue");
const child = () => import("../components/child.vue");
export default {
  data() {
    return {
      block: {
        title: '传参',
        text: 'sadfdaf'
      },
      message: "dsfafafafaf",
      divshow: true,
      t: "aaaaaa",
      c: "bbbbbbb",
      b1: true,
      b2: true,
      homeData: '我是主页数据',
      homeData2: '我是主页数据2'
    };
  },
  components: {
  // historyTab:resolve => {
  //  require(['../../component/historyTab/historyTab.vue'], resolve)
  // }
    child,
    block
  },
  mounted(){
  },
  created() {
    // 创建全局方法
    this.$root.$on("test", () => {
      this.homeData += '修改了'
    });

  },
  methods: {
    fnc(params) {
      console.log(params);
    },
    parentFn(params) {
      this.divshow = !this.divshow;
      console.log(params);
    },
    homeFn(e, f) {
      console.log('homeFN调用', e, f,  )
      console.log(this.homeData2)
    }
  }
};
</script>

<style scoped>
.sty {
  font-size: 30px;
}
</style>