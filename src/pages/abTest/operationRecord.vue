<template>
  <div class="record">
    操作记录
    <div v-for="(item, i) in recordList" :key="i">
      <p>{{ item.originProps.text }}</p>
      <div v-for="(prop, i) in item.editProps" :key="i">{{ parseField[Object.keys(prop)[0]] }}:{{ prop[Object.keys(prop)[0]] }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'operationRecord',
  components: {},
  props: {},
  data() {
    return {
      recordList: [],
      parseField: {
        text: '文本修改',
        fontSize: '字号大小',
        color: '文本修改',
      },
      // theRecord:
    }
  },
  methods: {
    setData(payload) {
      const pl = { ...payload, editProps: this.objToArray(payload.props) }
      const finded = this.recordList.find(e => e.selector === pl.selector)
      if (finded) {
        finded.props = pl.props
        finded.editProps = pl.editProps
      } else {
        this.recordList.push(pl)
      }
      console.log(pl)
    },
    objToArray(obj) {
      const keys = Object.keys(obj)
      const result = []
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = obj[key]
        if (typeof value === 'object') {
          result.push(...this.objToArray(value))
        } else if (typeof value === 'string') {
          const oo = {}
          oo[key] = value
          result.push(oo)
        }
      }
      return result
    },
  },
}
</script>

<style scoped lang="less">
.record {
  width: 240px;
  height: 100%;
}
</style>
