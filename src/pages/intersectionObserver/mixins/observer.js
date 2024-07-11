let observer = null
let obsNode = []
export default {
  data() {
    return {
      observeAttr: 'observeAttr',
    }
  },
  mounted() {},
  beforeDestroy() {
    this.cancelObserve()
  },
  methods: {
    // 设置首位节点交叉监听
    handleObserve() {
      obsNode.forEach(e => {
        e && observer.observe(e)
      })
    },
    // 关闭交叉监听
    cancelObserve() {
      console.log('完毕')
      obsNode.forEach(e => {
        observer.unobserve(e)
      })
      observer = null
      obsNode = []
    },
    notificationFn(node) {
      node.target.__vue__.update()
    },
    // 初始化
    initObserve(layout, nodes) {
      obsNode = nodes
      // 创建 IntersectionObserver 实例子
      observer = new IntersectionObserver(entries => {
        // 首次加载返回所有dom的状态
        console.log('entries', entries)
        entries.forEach((node, i) => {
          // 只看移入的元素
          if (node.isIntersecting) {
            this.notificationFn(node)
            obsNode.splice(i, 1)
            observer.unobserve(node.target)
          }
        })
      })
      this.handleObserve()
    },
  },
}
