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
    <el-button type="primary" @click="downloadCSV">downloadCSV</el-button>
    <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）">
      </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）">
      </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from 'axios';
import { getTest } from '@/services/request';
const block = () => import('../components/block.vue');
const child = () => import('../components/child.vue');

function isMSbrowser() {
  const userAgent = window.navigator.userAgent
  return userAgent.indexOf('Edge') !== -1 || userAgent.indexOf('Trident') !== -1
}

function format(data) {
  return String(data).replace(/"/g, '""').replace(/(^[\s\S]*$)/, '"$1"')
}

function saveCSV(title, head, data) {
  let wordSeparator = ','
  let lineSeparator = '\n'

  let reTitle = title + '.csv'
  let headBOM = '\ufeff'
  let headStr = head ? head.map(item => format(item)).join(wordSeparator) + lineSeparator : ''
  let dataStr = data ? data.map(row => row.map(item => format(item)).join(wordSeparator)).join(lineSeparator) : ''

  return isMSbrowser()
    ? new Promise(resolve => { // Edge、IE11
      let blob = new Blob([headBOM + headStr + dataStr], { type: 'text/plain;charset=utf-8' })
      window.navigator.msSaveBlob(blob, reTitle)
      resolve()
    })
    : new Promise(resolve => { // Chrome、Firefox
      let a = document.createElement('a')
      a.href = 'data:text/csv;charset=utf-8,' + headBOM + encodeURIComponent(headStr + dataStr)
      a.download = reTitle
      a.click()
      resolve()
    })
}

export default {
  data() {
    return {
      test: '',

      timer: null,
      bgColor: 'brown',
      changeColorTime: 0,
      changeColorTimeStart: 0,
      changeColorTimeEnd: 0,

      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }]
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

    downloadCSV() {
      let title = 'test'
      let head = ['key', 'value']
      let data = [
        ['a', '我是正常文本'],
        ['b', '我是"双引号"'],
        ['c', '我是,小逗号,'],
        ['d', '我是\n换行符']
      ]
      saveCSV(title, head, data).then(() => {
        console.log('success')
      })


    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        //   if (rowIndex % 2 === 0) {
        return {
          rowspan: 2,
          colspan: 1
        };
        //   } else {
        return {
          rowspan: 0,
          colspan: 0
        };
        //   }
      }
    },

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

          this.$nextTick(() => {
            this.clickHandle();

          });
          setTimeout(() => {
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