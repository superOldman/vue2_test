<template>
  <div class="fx">
    <ul>
      <li>
        <remove-html />
      </li>
      <li>
        <remove-focus />
      </li>
      <li></li>
    </ul>

  </div>
</template>

<script>
import removeHtml from './removeHtml'
import removeFocus from './removeFocus'
export default {
  name: 'smallTools',
  components: {
    removeHtml,
    removeFocus
  },
  props: {

  },
  data() {
    return {

    }
  },
  methods: {

  },
};
</script>

<style scoped lang="less">
</style>
