// 方法1  页面中引入， 发送 Bus.$emit('eve', msg )  需销毁一次 Bus.$emit('eve', msg ) 在另一页面 Bus.$on('eve', ()=>{})

//import Vue from 'vue';

// const Bus = new Vue({
//     data() {
//         return {
//             a: 1, b: 2, c: 3
//         }
//     }
// })
// export default Bus
import Vue from 'vue';
const Bus = new Vue();


class EventBus {
    fire(eventName, msg) {
        Bus.$emit(eventName, msg);
    }
    on(eventName, cb) {
        Bus.$on(eventName, cb);
    }

}

export default new EventBus();