<template>
  <div>
    111
  </div>
</template>

<script>
import Pinyin from '@/utils/PinyinCode'
export default {
  name: '',
  components: {

  },
  props: {

  },
  data() {
    return {
      peo: [
        {'wx_name': '?e'},
        {'wx_name': '/123'},
        { "id": 186, "uid": 112, "wx_name": "往事如风.", "re_name": "zzzz", "wx_image": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqKnDS6kHQgN9qFURLudRrNS8H7EVOdF9PLdz6iaoMVCdSlzgyMX3V2D1AVERSrjZnibTIibdy3PjeOA/132", "type": 0, "content": "微信沟通", "turnover": 1, "zc_create_time": 1607999219, "zf_create_time": 1609920523, "date": "2021-01-06", "describe": "01-06 16:08跟进客户" },
        { "id": 195, "uid": 117, "wx_name": "懒猫", "re_name": "", "wx_image": "https://thirdwx.qlogo.cn/mmopen/vi_32/ztkCor3EsLNslctkm8pQoJTlYZDoEGC4YXyfGkfN8hvI5ET9RRQq1GLklibkgQooPqeLdFpEgiamZqUwORqlnX6A/132", "type": null, "content": null, "turnover": 1, "zc_create_time": 1608170432, "zf_create_time": null, "date": "", "describe": "从未跟进客户" },
        { "id": 188, "uid": 97, "wx_name": "LOLO", "re_name": "", "wx_image": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epfuw3dJ8nftX06olnV6HQACiaLzgw8EsrsULQuQz1y4DC0Fqndoric74ZOiambZktGekZ6cibLTLQATw/132", "type": null, "content": null, "turnover": 1, "zc_create_time": 1608010130, "zf_create_time": null, "date": "", "describe": "从未跟进客户" },
        { "id": 228, "uid": 72, "wx_name": "余溫", "re_name": "", "wx_image": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJXo3VsMzMCbaqWrO7icb32l4ndSAoibwsThBs03qh6asnZ9bqZ1sIDOamcibKlfypyiaBliaIOMZcvKMg/132", "type": null, "content": null, "turnover": 1, "zc_create_time": 1611121086, "zf_create_time": null, "date": "", "describe": "从未跟进客户" },
        { "id": 94, "uid": 57, "wx_name": "往事如风.", "re_name": "", "wx_image": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epOteLONqVDicQQMicCbZEiaqRp03VjIYHibqzZ64IKn24nmWZadlMZIhc7onBS0yeGJ4uibscME4GmYSg/132", "type": null, "content": null, "turnover": 1, "zc_create_time": 1604405070, "zf_create_time": null, "date": "", "describe": "从未跟进客户" },
        { "id": 93, "uid": 43, "wx_name": "狂奔的小猴", "re_name": "", "wx_image": "/static/default.jpg", "type": null, "content": null, "turnover": 1, "zc_create_time": 1604404800, "zf_create_time": null, "date": "", "describe": "从未跟进客户" },
        { "id": 152, "uid": 1, "wx_name": "母笑阳", "re_name": "", "wx_image": "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJCU8g4J5CKpLNE2sz1d0QLibqcFkRVRmdX0uRJca9U2lz5ibBBiaRWtemKP8uLYeb1prCSxWt6r56nw/132", "type": null, "content": null, "turnover": 1, "zc_create_time": 1606208282, "zf_create_time": null, "date": "", "describe": "从未跟进客户" }
      ]
    }
  },
  mounted() {
    this.run()
  },
  methods: {
    pinyinSort(name) {
      var pinyinArray = new Array()
      for (var bukn = 0; bukn < name.length; bukn++) {
        var o = new Object()
        var ken = Pinyin.getSpell(name[bukn], function (charactor, spell) {
          console.log(charactor, spell);
          return spell[1];
        });
        o.name = name[bukn]
        o.pinyin = ken.split(',').join('')
        pinyinArray.push(o)
      }
      console.log("pinyinArray")
      console.log(pinyinArray)
      // pinyinArray = pinyinArray.sort(compare("pinyin"))
      let map = {}
      pinyinArray.forEach((item, index) => {
        if (!map[item.pinyin[0].toUpperCase()]) {
          map[item.pinyin[0].toUpperCase()] = {
            title: item.pinyin[0].toUpperCase(),
            datas: []
          }
        }
        map[item.pinyin[0].toUpperCase()].datas.push({
          name: item.name,
          pinyin: item.pinyin
        })
      }
      )
      console.log("map")
      console.log(map)

      var turn = new Array()
      var letters = "*ABCDEFGHIJKLNMOPQRSTUVWXYZ".split('');
      for (var i = 1; i < letters.length; i++) {
        if (map[letters[i]]) {
          var obj = new Object()
          //自己改改命名改成自己需要的
          obj.title = letters[i]
          obj.datas = map[letters[i]].datas
          turn.push(obj)
        }else{
          console.log(111)
        }
      }

      console.log( Object.values(map))
      console.log( Object.keys(map))

     


      console.log("turn")
      console.log(turn)
      return turn
    },

    run() {
      var name = this.peo.map(e=>e.wx_name)
      var arr = this.pinyinSort(name)
      console.log(arr)
    }
  },
};
</script>

<style scoped lang="stylus"></style>
