<template>
  <div class="main" v-loading="waiting">
    <p style="text-align: left;">拼音首字母排序</p>
    <el-row v-for="(item, i) in peo" :key="i">
      <el-col :span="1">名字:</el-col>
      <el-col :span="2" style="text-align: left;">{{ item.wx_name }}</el-col>
    </el-row>
    ---------------------
    <el-row v-for="(item, i) in sortArr" :key="i + '_'">
      <el-col :span="2">首字母：{{ item.title }}</el-col>
      <el-col :span="2" style="text-align: left;">
        <div v-for="(it, i) in item.datas" :key="i">
          {{ it.name }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pinyin from '@/utils/PinyinCode'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      peo: [
        { wx_name: '?e' },
        { wx_name: '/123' },
        {
          id: 186,
          uid: 112,
          wx_name: '往事如风.',
          re_name: 'zzzz',
          wx_image: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqKnDS6kHQgN9qFURLudRrNS8H7EVOdF9PLdz6iaoMVCdSlzgyMX3V2D1AVERSrjZnibTIibdy3PjeOA/132',
          type: 0,
          content: '微信沟通',
          turnover: 1,
          zc_create_time: 1607999219,
          zf_create_time: 1609920523,
          date: '2021-01-06',
          describe: '01-06 16:08跟进客户',
        },
        {
          id: 195,
          uid: 117,
          wx_name: '懒猫',
          re_name: '',
          wx_image: 'https://thirdwx.qlogo.cn/mmopen/vi_32/ztkCor3EsLNslctkm8pQoJTlYZDoEGC4YXyfGkfN8hvI5ET9RRQq1GLklibkgQooPqeLdFpEgiamZqUwORqlnX6A/132',
          type: null,
          content: null,
          turnover: 1,
          zc_create_time: 1608170432,
          zf_create_time: null,
          date: '',
          describe: '从未跟进客户',
        },
        {
          id: 188,
          uid: 97,
          wx_name: 'LOLO',
          re_name: '',
          wx_image: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epfuw3dJ8nftX06olnV6HQACiaLzgw8EsrsULQuQz1y4DC0Fqndoric74ZOiambZktGekZ6cibLTLQATw/132',
          type: null,
          content: null,
          turnover: 1,
          zc_create_time: 1608010130,
          zf_create_time: null,
          date: '',
          describe: '从未跟进客户',
        },
        {
          id: 228,
          uid: 72,
          wx_name: '余溫',
          re_name: '',
          wx_image: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJXo3VsMzMCbaqWrO7icb32l4ndSAoibwsThBs03qh6asnZ9bqZ1sIDOamcibKlfypyiaBliaIOMZcvKMg/132',
          type: null,
          content: null,
          turnover: 1,
          zc_create_time: 1611121086,
          zf_create_time: null,
          date: '',
          describe: '从未跟进客户',
        },
        {
          id: 94,
          uid: 57,
          wx_name: '往事如风.',
          re_name: '',
          wx_image: 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epOteLONqVDicQQMicCbZEiaqRp03VjIYHibqzZ64IKn24nmWZadlMZIhc7onBS0yeGJ4uibscME4GmYSg/132',
          type: null,
          content: null,
          turnover: 1,
          zc_create_time: 1604405070,
          zf_create_time: null,
          date: '',
          describe: '从未跟进客户',
        },
        {
          id: 93,
          uid: 43,
          wx_name: '狂奔的小猴',
          re_name: '',
          wx_image: '/static/default.jpg',
          type: null,
          content: null,
          turnover: 1,
          zc_create_time: 1604404800,
          zf_create_time: null,
          date: '',
          describe: '从未跟进客户',
        },
        {
          id: 152,
          uid: 1,
          wx_name: '母笑阳',
          re_name: '',
          wx_image: 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJCU8g4J5CKpLNE2sz1d0QLibqcFkRVRmdX0uRJca9U2lz5ibBBiaRWtemKP8uLYeb1prCSxWt6r56nw/132',
          type: null,
          content: null,
          turnover: 1,
          zc_create_time: 1606208282,
          zf_create_time: null,
          date: '',
          describe: '从未跟进客户',
        },
      ],
      sortArr: [],
      waiting: false,
    }
  },
  mounted() {
    console.log(this.$route.params)
    this._sort()
    // this.waiting = true;
    // setTimeout(()=>{
    //   this.waiting = false;
    // }, 5000);
  },
  methods: {
    pinyinSort(name) {
      // 提取拼音
      let pinyinArray = new Array()
      for (let bukn = 0; bukn < name.length; bukn++) {
        let o = new Object()
        let ken = Pinyin.getSpell(name[bukn], function(charactor, spell) {
          console.log(charactor, spell)
          return spell[1]
        })
        o.name = name[bukn]
        o.pinyin = ken.split(',').join('')
        pinyinArray.push(o)
      }

      // 整理出首字母
      let map = {}
      pinyinArray.forEach((item, index) => {
        if (!map[item.pinyin[0].toUpperCase()]) {
          map[item.pinyin[0].toUpperCase()] = {
            title: item.pinyin[0].toUpperCase(),
            datas: [],
          }
        }
        map[item.pinyin[0].toUpperCase()].datas.push({
          name: item.name,
          pinyin: item.pinyin,
        })
      })

      // 排序:
      let turn = new Array()
      let letters = 'ABCDEFGHIJKLNMOPQRSTUVWXYZ'.split('')
      for (let i = 0; i < letters.length; i++) {
        if (map[letters[i]]) {
          let obj = new Object()
          // 自己改改命名改成自己需要的
          obj.title = letters[i]
          obj.datas = map[letters[i]].datas
          turn.push(obj)
        }
      }

      // 不是字母的归类
      let other = { title: '#', datas: [] }
      let keyArr = Object.keys(map)
      let zz = /[a-z]/i
      keyArr.forEach(e => {
        if (!zz.test(e)) {
          other.datas = other.datas.concat(map[e].datas)
        }
      })

      turn.push(other)
      return turn
    },

    _sort() {
      let name = this.peo.map(e => e.wx_name)
      let arr = this.pinyinSort(name)
      this.sortArr = arr
      console.log(arr)
    },
  },
}
</script>
<style lang="less">
.el-loading-spinner .circular {
  display: none;
}
.el-loading-spinner {
  --color: #409eff;
  --size-square: 14px;
}

.el-loading-spinner::before,
.el-loading-spinner::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
}
.el-loading-spinner::before,
.el-loading-spinner::after {
  width: var(--size-square);
  height: var(--size-square);
  background-color: var(--color);
}

.el-loading-spinner::before {
  top: calc(50% - var(--size-square));
  left: calc(50% - var(--size-square));
  animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

.el-loading-spinner::after {
  top: 50%;
  left: 50%;
  animation: loader-7 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}
@keyframes loader-6 {
  0%,
  100% {
    transform: none;
  }

  25% {
    transform: translateX(100%);
  }

  50% {
    transform: translateX(100%) translateY(100%);
  }

  75% {
    transform: translateY(100%);
  }
}
@keyframes loader-7 {
  0%,
  100% {
    transform: none;
  }

  25% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(-100%) translateY(-100%);
  }

  75% {
    transform: translateY(-100%);
  }
}
</style>
<style scoped lang="less">
.main {
  text-align: left;
}

.loader {
  --color: white;
  --size-mid: 6vmin;
  --size-dot: 1.5vmin;
  --size-bar: 0.4vmin;
  --size-square: 3vmin;

  display: block;
  position: relative;
  width: 50%;
  display: grid;
  place-items: center;
}

.loader::before,
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
}

/**
	loader --1
**/
.loader--1::before {
  width: var(--size-mid);
  height: var(--size-mid);
  border: 4px solid var(--color);
  border-top-color: transparent;
  border-radius: 50%;
  animation: loader-1 1s linear infinite;
}

.loader--1::after {
  width: calc(var(--size-mid) - 2px);
  height: calc(var(--size-mid) - 2px);
  border: 2px solid transparent;
  border-top-color: var(--color);
  border-radius: 50%;
  animation: loader-1 0.6s linear reverse infinite;
}

@keyframes loader-1 {
  100% {
    transform: rotate(1turn);
  }
}

/**
	loader --2
**/
.loader--2::before,
.loader--2::after {
  width: var(--size-dot);
  height: var(--size-dot);
  background-color: var(--color);
  border-radius: 50%;
  opacity: 0;
  animation: loader-2 0.8s cubic-bezier(0.2, 0.32, 0, 0.87) infinite;
}

.loader--2::after {
  animation-delay: 0.3s;
}

@keyframes loader-2 {
  0%,
  80%,
  100% {
    opacity: 0;
  }

  33% {
    opacity: 1;
  }

  0%,
  100% {
    transform: translateX(-4vmin);
  }

  90% {
    transform: translateX(4vmin);
  }
}

/**
	loader --3
**/
.loader--3::before,
.loader--3::after {
  width: var(--size-dot);
  height: var(--size-dot);
  background-color: var(--color);
  border-radius: 50%;
  animation: loader-3 1.2s ease-in-out infinite;
}

.loader--3::before {
  left: calc(50% - 1.6vmin - var(--size-dot));
}

.loader--3::after {
  left: calc(50% + 1.6vmin);
  animation-delay: -0.4s;
}

@keyframes loader-3 {
  0%,
  100% {
    transform: translateY(-2.6vmin);
  }

  44% {
    transform: translateY(2.6vmin);
  }
}

/**
	loader --4
**/
.loader--4::before {
  height: var(--size-bar);
  width: 6vmin;
  background-color: var(--color);
  animation: loader-4 0.8s cubic-bezier(0, 0, 0.03, 0.9) infinite;
}

@keyframes loader-4 {
  0%,
  44%,
  88.1%,
  100% {
    transform-origin: left;
  }

  0%,
  100%,
  88% {
    transform: scaleX(0);
  }

  44.1%,
  88% {
    transform-origin: right;
  }

  33%,
  44% {
    transform: scaleX(1);
  }
}

/**
	loader --5
**/
.loader--5::before,
.loader--5::after {
  height: 3vmin;
  width: var(--size-bar);
  background-color: var(--color);
  animation: loader-5 0.6s cubic-bezier(0, 0, 0.03, 0.9) infinite;
}

.loader--5::before {
  left: calc(50% - 1vmin);
  top: calc(50% - 3vmin);
}

.loader--5::after {
  left: calc(50% + 1vmin);
  top: calc(50% - 1vmin);
  animation-delay: 0.2s;
}

@keyframes loader-5 {
  0%,
  88%,
  100% {
    opacity: 0;
  }

  0%,
  44%,
  88.1%,
  100% {
    transform-origin: top;
  }

  0% {
    transform: translateY(-6vmin);
  }

  44.1%,
  88% {
    transform-origin: bottom;
  }

  33% {
    opacity: 1;
  }

  33%,
  88% {
    transform: translateY(3vmin);
  }
}

/**
	loader --6
**/
.loader--6::before {
  width: var(--size-square);
  height: var(--size-square);
  background-color: var(--color);
  top: calc(50% - var(--size-square));
  left: calc(50% - var(--size-square));
  animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-6 {
  0%,
  100% {
    transform: none;
  }

  25% {
    transform: translateX(100%);
  }

  50% {
    transform: translateX(100%) translateY(100%);
  }

  75% {
    transform: translateY(100%);
  }
}

/**
	loader --7
**/
.loader--7::before,
.loader--7::after {
  width: var(--size-square);
  height: var(--size-square);
  background-color: var(--color);
}

.loader--7::before {
  top: calc(50% - var(--size-square));
  left: calc(50% - var(--size-square));
  animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

.loader--7::after {
  top: 50%;
  left: 50%;
  animation: loader-7 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-7 {
  0%,
  100% {
    transform: none;
  }

  25% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(-100%) translateY(-100%);
  }

  75% {
    transform: translateY(-100%);
  }
}

/**
	loader --8
**/
.loader--8::before,
.loader--8::after {
  width: var(--size-dot);
  height: var(--size-dot);
  border-radius: 50%;
  background-color: var(--color);
}

.loader--8::before {
  top: calc(50% + 4vmin);
  animation: loader-8-1 0.8s cubic-bezier(0.06, 0.01, 0.49, 1.18) infinite;
}

.loader--8::after {
  opacity: 0;
  top: calc(50% - 2vmin);
  animation: loader-8-2 0.8s cubic-bezier(0.46, -0.1, 0.27, 1.07) 0.2s infinite;
}

@keyframes loader-8-1 {
  0%,
  55%,
  100% {
    opacity: 0;
  }

  0% {
    transform: scale(0.2);
  }

  22% {
    opacity: 1;
  }

  33%,
  55% {
    transform: scale(1) translateY(-6vmin);
  }
}

@keyframes loader-8-2 {
  0%,
  100% {
    opacity: 0;
  }

  33% {
    opacity: 0.3;
  }

  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(4);
  }
}

/**
	loader --9
**/
.loader--9::before,
.loader--9::after {
  width: var(--size-dot);
  height: var(--size-dot);
  border-radius: 50%;
  background-color: var(--color);
  animation: loader-9 0.42s cubic-bezier(0.39, 0.31, 0, 1.11) infinite;
}

.loader--9::before {
  left: calc(50% - var(--size-dot) - 1.6vmin);
}

.loader--9::after {
  left: calc(50% + 1.6vmin);
  animation-delay: 0.12s;
}

@keyframes loader-9 {
  0%,
  100% {
    opacity: 0;
  }

  0% {
    transform: translate(-4vmin, -4vmin);
  }

  66% {
    opacity: 1;
  }

  66%,
  100% {
    transform: none;
  }
}

/**
	miscs
**/

.container {
  display: grid;
  grid-template-columns: repeat(3, 18vmin);
  grid-template-rows: repeat(3, 18vmin);
  grid-gap: 1vmin;
}

.item {
  background: rgba(255, 255, 255, 0.1);
  display: grid;
  place-items: center;
  border-radius: 4px;
}
</style>
