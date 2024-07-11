<template>
  <div class="panl">
    <el-form v-if="form" label-position="top" label-width="80px" :model="form">
      <el-form-item label="文本内容">
        <el-input v-model="form.text" @change="changeHandle"></el-input>
      </el-form-item>
      <el-form-item label="字号大小">
        <el-input v-model="form.attributes.style.fontSize" @change="changeHandle"></el-input>
      </el-form-item>
      <el-form-item label="文本颜色">
        <el-input v-model="form.attributes.style.color" @change="changeHandle"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'operationPanel',
  components: {},
  props: {
    data: null,
  },
  data() {
    return {
      form: null,
      source: {
        text: 't box',
        attributes: {
          style: {
            height: '21px',
            width: '1366px',
            fontSize: '16px',
            color: 'rgb(0, 0, 0)',
            fontWeight: '400',
            borderWidth: '0px',
            borderStyle: 'none',
            fontStyle: 'normal',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderRadius: '0px',
            textDecorationLine: 'none',
            textAlign: 'start',
            float: 'none',
            left: 'auto',
            top: 'auto',
            bottom: 'auto',
            right: 'auto',
            position: 'static',
            fontFamily: '"Microsoft YaHei"',
            lineHeight: 'normal',
            wordSpacing: '0px',
            whiteSpace: 'normal',
            textDecoration: 'none solid rgb(0, 0, 0)',
            overflow: 'visible',
            verticalAlign: 'baseline',
            zIndex: 'auto',
            backgroundImage: 'none',
            backgroundRepeat: 'repeat',
            margin: '0px',
            padding: '0px',
            borderColor: 'rgb(0, 0, 0)',
            opacity: '1',
            textDecorationColor: 'rgb(0, 0, 0)',
            textDecorationStyle: 'solid',
          },
        },
      },
    }
  },
  methods: {
    echoFn() {
      this.source = JSON.parse(JSON.stringify(this.data.originProps))
      this.form = this.data.originProps
      const props = this.data.props
      if (props) {
        const resKey = []
        function getKey(props, theKey = '') {
          for (const key in props) {
            if (typeof props[key] === 'object') {
              getKey(props[key], theKey + key + '.')
            } else if (typeof props[key] === 'string') {
              resKey.push({
                key: theKey ? theKey + key : key,
                value: props[key],
              })
            }
          }
        }
        getKey(props)
        this.parseStringToObject(this.form, resKey)
      }
    },
    changeHandle() {
      const resKey = this.getDifferent(this.source, this.form)
      let props = {}
      props = this.parseStringToObject(props, resKey)
      console.log('props', props)
      this.$emit('change', props)
    },
    parseStringToObject(object, resKey = []) {
      resKey.forEach(e => {
        const { key, value } = e
        if (key.indexOf('.') !== -1) {
          const keys = key.split('.')
          let propsK = object
          keys.forEach((k, i) => {
            if (i === keys.length - 1) {
              propsK[k] = value
            } else {
              if (!propsK[k]) propsK[k] = {}
              propsK = propsK[k]
            }
          })
        } else {
          object[key] = value
        }
      })
      return object
    },

    getDifferent(source, other) {
      const resKey = []
      function diff(source, other, theKey = '') {
        for (const key in source) {
          if (Object.hasOwnProperty.call(other, key)) {
            const sourceVal = source[key]
            const otherVal = other[key]
            // 判断类型
            if (typeof sourceVal === 'string' && typeof otherVal === 'string') {
              if (sourceVal !== otherVal) {
                resKey.push({
                  key: theKey ? theKey + key : key,
                  value: otherVal,
                })
              }
            } else if (typeof sourceVal === 'object' && typeof otherVal === 'object') {
              diff(sourceVal, otherVal, theKey + key + '.')
            }
          }
        }
      }

      diff(source, other)
      console.log(resKey, resKey)
      return resKey
    },
  },
}
</script>

<style scoped lang="less">
.panl {
  width: 240px;
  height: 100%;
}
</style>
