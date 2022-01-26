<template>
  <div class="main">

    <img style="width:100px;height:100px" src="https://img01.dclggtg.net/data/108u922/public/202012/20201218/2020121816565317423.png" alt="" srcset="@/assets/logo.png">
  </div>
</template>
<script>
import axios from 'axios';
const block = () => import('../components/block.vue');
const child = () => import('../components/child.vue');
export default {
  data() {
    return {
    }
  },
  components: {
    // historyTab:resolve => {
    //  require(['../../component/historyTab/historyTab.vue'], resolve)
    // }
    // child,
    // block
  },
  mounted() {

    // var a= this.getBlobURL('http://p.qlogo.cn/bizmail/Ilfia76w7KibHkXKx3YtCMHm5rte0zxHk4fs9FQtTDaq9LzzjPsjYx9A/0');
    var a = this.getBlobURL('/logo.png');
    console.log(a);
  },
  created() {
    // 创建全局方法
    this.$root.$on('test', () => {
      this.homeData += '修改了';
    });

  },
  methods: {
    async getBlobURL(url, err_handler) {
      axios({
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
        console.log(blob_url)
      }).catch((err) => {
        if (err_handler != undefined) {
          err_handler(err);
        }
      })
    },


  }
}
</script>

<style scoped lang="less">
.main {
  text-align: left;
}
</style>