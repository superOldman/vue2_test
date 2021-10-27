<template>
  <div class="main">
    <el-row>
      <el-col :span="3">去除标签：</el-col>
      <el-col :span="10">{{htmlStr}}</el-col>
      <el-col :span="10">{{removeHtml(htmlStr)}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="3">去除Button焦点的颜色：</el-col>
      <el-col :span="10"> <el-button @click="clickHandler">打法是否</el-button></el-col>
    </el-row>
    <button @click="$router.push({name:'pinyin',params:{id:2313123131},query:{ddd:1}})">跳转</button>
    <button @click="$router.push({path:'/pinyin?ddd=1'})">跳转2</button>
    <!-- <img src="@/assets/logo.png1" alt="" srcset=""> -->
    <img style="width:100px;height:100px" src="https://img01.dclggtg.net/data/108u922/public/202012/20201218/2020121816565317423.png" alt="" srcset="@/assets/logo.png">
    slotTest
  </div>
</template>
<script>
import axios from 'axios';
import slotTest from '@/components/slotTest'
// import child from "../components/child.vue";
// import block from "../components/block.vue";
const block = () => import('../components/block.vue');
const child = () => import('../components/child.vue');
export default {
  data() {
    return {
      htmlStr: '<div><font color="#FF1A1A">华</font><font color="#FF1A1A">为</font>技术有限公司</div>'
    };
  },
  components: {
    // historyTab:resolve => {
    //  require(['../../component/historyTab/historyTab.vue'], resolve)
    // }
    // child,
    // block
  },
  mounted() {
    this.getBlobURL('http://p.qlogo.cn/bizmail/Ilfia76w7KibHkXKx3YtCMHm5rte0zxHk4fs9FQtTDaq9LzzjPsjYx9A/0');

  },
  created() {
    // 创建全局方法
    this.$root.$on('test', () => {
      this.homeData += '修改了';
    });

  },
  methods: {
    async getBlobURL(url, err_handler) {
      let blobUrl = axios({
        url: url,
        method: 'GET',
        responseType: 'blob',
        headers: {
          'Content-Type': 'image/jpg',
          'client_type': 'DESKTOP_WEB',
          'Cache-Control': 'no-cache'
        }
      }).then((data) => {
        let blob = new Blob([data], {
          type: 'image/jpg'
        });
        let blob_url = window.URL.createObjectURL(blob);
        return blob_url;
      }).catch((err) => {
        if (err_handler != undefined) {
          err_handler(err);
        }
      });
      return blobUrl;
    },
    removeHtml(str) {
      const reTag = /<(?:.|\s)*?>/g;
      return str.replace(reTag, '').replace(/&nbsp;/ig, '');
    },
    clickHandler(evt) {
      let target = evt.target;
      if (target.nodeName == 'SPAN') {
        target = evt.target.parentNode;
      }
      target.blur();
    }
  }
};
</script>

<style scoped lang="less">
.main {
  text-align: left;
}
</style>