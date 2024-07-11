<template>
  <div>
    <el-button @click="downloadExl([tt], 'test')">下载excel</el-button>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      tt: {
        keyword: 1,
        searchVolume: 2,
        lang: 3,
        cpc: 'CPC',
        competition: '天眼查专注服务于个人与企业信息查询,都在用的商业查询平台,为您提供公司查询,工商信息查询,企业查询,工商查询,企业信用信息查询等相关信息,帮您快速了解企业信息,企业工商信息',
      },
    }
  },
  methods: {
    downloadExl: function(json, downName, type) {
      // 导出到excel
      const keyMap = [] // 获取键
      for (const k in json[0]) {
        keyMap.push(k)
      }
      console.info('keyMap', keyMap, json)
      const tmpdata = [] // 用来保存转换好的json
      json
        .map((v, i) => {
          return keyMap.map((k, j) => {
            console.log({
              v: v[k],
              position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1),
            })
            return Object.assign({}, { v: v[k], position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1) })
          })
        })
        .reduce((prev, next) => prev.concat(next))
        .forEach(function(v) {
          tmpdata[v.position] = {
            v: v.v,
          }
        })

      console.log(json)
      console.log(tmpdata)
      const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
      const tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
          mySheet: Object.assign(
            {},
            tmpdata, // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1], // 设置填充区域
            }
          ),
        },
      }
      const tmpDown = new Blob(
        [
          this.s2ab(
            XLSX.write(
              tmpWB,
              {
                bookType: type === undefined ? 'xlsx' : type,
                bookSST: false,
                type: 'binary',
              } // 这里的数据是用来定义导出的格式类型
            )
          ),
        ],
        {
          type: '',
        }
      ) // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown) // 创建对象超链接
      const outFile = document.createElement('a')
      outFile.download = downName + '.xlsx' // 下载名称
      outFile.href = href // 绑定a标签
      outFile.click() // 模拟点击实现下载
      setTimeout(function() {
        // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    s2ab: function(s) {
      // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff
      }
      return buf
    },
    getCharCol: function(n) {
      // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = (n % 26) + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata: function(data) {
      // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
  },
}
</script>

<style scoped lang="scss"></style>
