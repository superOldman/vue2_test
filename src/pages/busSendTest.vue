<template>
  <div>
      <div>page: {{busPage}}</div>
      <button @click="send">send and toPage</button>
      <br />
      <button @click="send2">send and toPage</button>
  </div>
</template>

<script>
import Bus from '../bus';
export default {
    data(){
        return{
            busPage: 'busPage1'
        }
    },
    created(){
        // console.log(Bus.a)
    },
    methods:{
        send(){
            Bus.$emit('message', this.busPage)
        },
        send2(){
            // EventBus.fire('message', this.busPage)
            this.$$EventBus.fire('message', this.busPage)

        }
    },
    destroyed(){
        // Bus.$emit('message', this.busPage)
    }
}
</script>

<style>

</style>