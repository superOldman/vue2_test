<template>
  <div class="wh-100 fx">
    <operationPanel ref="operationPanel" class="fx-none" :data="domData" @change="changeHandle" />
    <iframe
      loading="eager"
      seamless
      class="ifr"
      name='{"is_vabtesting":true,"source_url":"https://spec.marketingforce.com/abtest/abDemo/kimiTest/sc_user_test.html","link_match_type":"STRICT"}'
      src="https://spec.marketingforce.com/abtest/abDemo/kimiTest/sc_user_test.html"
      frameborder="0"
      width="1200"
      height="800px"
    ></iframe>
    <operationRecord ref="operationRecord" class="fx-none" />
  </div>
</template>

<script>
import operationPanel from '@/pages/abTest/operationPanel'
import operationRecord from '@/pages/abTest/operationRecord'
function MessageEncode(e, t) {
  void 0 === e && (e = {}), void 0 === t && (t = JSON.stringify({}))
  var i = t
  try {
    i = encodeURIComponent(JSON.stringify(e))
  } catch (n) {
    console.error('[@FrameBridge:error] MessageDecode error', n)
  }
  return i
}
function MessageDecode(e, t) {
  void 0 === t && (t = null)
  var i = t
  try {
    i = JSON.parse(decodeURIComponent(e || ''))
  } catch (n) {
    ;(i = t), console.warn('@FrameBridge MessageDecode error', n)
  }
  return i
}
function generateMessageId(ENV) {
  return (ENV || '') + '@' + Date.now() + '@' + Math.floor(Math.random() * 11)
}
let iframeWindow = null
let selectDomPayload = null
export default {
  name: 'abTest',
  components: {
    operationPanel,
    operationRecord,
  },
  props: {},
  data() {
    return {
      drawer: false,
      domData: {},
    }
  },
  created() {
    const self = this
    window.addEventListener('message', function(e) {
      if (typeof e.data === 'string') {
        const message = MessageDecode(e.data)
        console.log('  ---------------------------', message)

        if (!['CONNECT', 'SELECT_ELEMENT'].includes(message.type)) return
        let payload
        if (message.type === 'CONNECT') {
          payload = {
            connect: true,
            support: {
              styles: [
                'height',
                'width',
                'fontSize',
                'color',
                'fontWeight',
                'borderWidth',
                'borderStyle',
                'fontStyle',
                'backgroundColor',
                'borderRadius',
                'textDecorationLine',
                'textAlign',
                'float',
                'left',
                'top',
                'bottom',
                'right',
                'position',
                'fontFamily',
                'fontWeight',
                'lineHeight',
                'wordSpacing',
                'whiteSpace',
                'textDecoration',
                'overflow',
                'verticalAlign',
                'zIndex',
                'backgroundImage',
                'backgroundRepeat',
                'margin',
                'padding',
                'borderColor',
                'borderWidth',
                'borderStyle',
                'opacity',
                'textDecorationColor',
                'textDecorationStyle',
                'textDecorationLine',
              ],
              tagNames: [
                'img',
                'a',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'span',
                'div',
                'li',
                'ol',
                'p',
                'pre',
                'ul',
                'dd',
                'i',
                'dt',
                'dl',
                'b',
                'cite',
                'em',
                'mark',
                'small',
                'strong',
                'sub',
                'sup',
                'u',
                'button',
                'td',
                'title',
                'label',
                'code',
                'blockquote',
                'figcaption',
                'figure',
                'area',
                'select',
                'article',
                'slot',
                'aside',
              ],
              attributes: ['text', 'src', 'href', 'target'],
              action: {
                KEY_DOWN: {
                  eventValues: ['key', 'keyCode', 'ctrlKey', 'metaKey'],
                  preventDefault: true,
                },
                MOUSE_UP: {
                  eventValues: [],
                },
                WHEEL_EVENT: {
                  eventValues: ['ctrlKey', 'metaKey', 'deltaY'],
                  preventDefault: true,
                },
                MOUSE_MOVE: {
                  eventValues: ['clientX', 'clientY'],
                },
              },
            },
          }
          // Create a message object
          if (!iframeWindow) {
            iframeWindow = e.source
          }
        } else if (message.type === 'SELECT_ELEMENT') {
          payload = { status: true }
          selectDomPayload = message.payload
          self.domData = JSON.parse(JSON.stringify(message.payload))

          self.$nextTick(() => {
            self.$refs.operationPanel.echoFn()
          })
        }

        const sendMessage = {
          $id: generateMessageId('CONTAINER'),
          type: message.$id,
          status: 'PENDING' || MessageStatus.PENDING,
          payload: payload,
          source: 'sa-fe-abtesting-mode',
        }
        iframeWindow.postMessage(MessageEncode(sendMessage), '*')
      }
    })

    class ContainerSenter {
      constructor(e) {}
      addElementSnapshot(props) {
        const payload = {
          ...selectDomPayload,
          isModify: true,
          props, // 修改了哪项
        }
        var sendMessage = {
          $id: generateMessageId('CONTAINER'),
          type: 'ADD_ELEMENT_SNAPSHOT',
          status: 'PENDING' || MessageStatus.PENDING,
          payload: payload,
          source: 'sa-fe-abtesting-mode',
        }

        iframeWindow.postMessage(MessageEncode(sendMessage), '*')
      }
      markElement(props) {
        const payload = {
          ...selectDomPayload,
          isModify: true,
          props, // 修改了哪项
        }
        var sendMessage = {
          $id: generateMessageId('CONTAINER'),
          type: 'MARK_ELEMENT',
          status: 'PENDING' || MessageStatus.PENDING,
          payload: payload,
          source: 'sa-fe-abtesting-mode',
        }

        iframeWindow.postMessage(MessageEncode(sendMessage), '*')
      }
    }
    this.senter = new ContainerSenter()
  },
  methods: {
    changeHandle(props) {
      this.senter?.addElementSnapshot(props)

      this.$refs.operationRecord.setData({
        ...selectDomPayload,
        props,
      })
    },
  },
}
</script>

<style scoped lang="less"></style>
