<template>
  <div class="main">
    <img style="width:100px;height:100px" src="https://img01.dclggtg.net/data/108u922/public/202012/20201218/2020121816565317423.png" alt="" srcset="@/assets/logo.png">

    <div class="box" :style="{'background-color':bgColor}" @click="clickHandle">

      <!-- <template v-if="changeColorTime"> -->
        <div>{{changeColorTime}}</div>
      <!-- </template> -->
    </div>

    <el-input type="textarea" v-model="test" placeholder=""></el-input>

    <text-overflow>123123123</text-overflow>
  </div>
</template>
<script>
import axios from 'axios';
import { getTest } from '@/services/request';
const block = () => import('../components/block.vue');
const child = () => import('../components/child.vue');
export default {
  data() {
    return {
      test: '',

      timer: null,
      bgColor: 'brown',
      changeColorTime: 0,
      changeColorTimeStart: 0,
      changeColorTimeEnd: 0
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
    // const res = getTest()
    // console.log(res)
    // this.getTest()
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
    clickHandle() {
      if (this.timer) {
        if (!this.changeColorTimeStart) {
          this.changeColorTime = '太快了';
          clearTimeout(this.timer);
          this.timer = null;
          return;
        }
        this.changeColorTimeEnd = new Date().getTime();
        this.changeColorTime = this.changeColorTimeEnd - this.changeColorTimeStart;
        this.timer = null;
      } else {
        this.bgColor = 'brown';
        this.changeColorTimeStart = 0;
        this.changeColorTimeEnd = 0;
        this.changeColorTime = 0;
        this.timer = setTimeout(() => {
          this.bgColor = 'green';
          this.changeColorTimeStart = new Date().getTime();

          this.$nextTick(()=>{
            this.clickHandle();

          });
          setTimeout(()=>{
            // this.clickHandle();
          });
        }, Math.floor(Math.random() * 3000));
      }
    },
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
        console.log(blob_url);
      }).catch((err) => {
        if (err_handler != undefined) {
          err_handler(err);
        }
      });
    },
    getTest() {
      var xhr = new XMLHttpRequest();
      xhr.open('post', '/localhost/test');
      xhr.timeout = 30000;
      xhr.responseType = 'text';
      xhr.onreadystatechange = function () {
        if (this.readyState == 3) { // 分段获取服务端返回的数据
          console.log('responseText', this.responseText);
        }
        if (this.readyState == 4) {
          if (this.status >= 200 && this.status < 300 || this.status == 304) {
            // this.response
          } else {
            // this.statusText
          }
        }
      };
      xhr.send();
    }

  }
};
</script>

<style scoped lang="less">
.main {
  text-align: left;
}
.box {
  width: 500px;
  height: 300px;
}
</style>