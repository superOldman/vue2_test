<template>
  <div>
      <div>page: {{busPage}}</div>
      <div>Bus获取信息：{{message}}</div>
      <div>EventBus获取信息：{{message2}}</div>
  </div>
</template>

<script>
import Bus from '../bus';
import EventBus from '../EventBus';
export default {
    data(){
        return{
            busPage: 'busPage2',
            message: '未收到',
            message2: '未收到',
        }
    },
    created(){
        // console.log(Bus)
        // console.log(Bus.a)
        // console.log(Bus.b)
        this.get();
        this.get2();
    },
    methods:{
        get(){
            Bus.$on('message', (msg)=>{
                this.message = msg
            })
        },
        get2(){
            console.log('get2')
            EventBus.on('message',(msg)=>{
                this.message2 = msg;
            })
        }
    }
}
</script>

<style>

</style>