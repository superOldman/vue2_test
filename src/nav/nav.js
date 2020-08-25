import home from '../pages/home.vue';
import vfor_test from '../pages/vfor_test.vue';
import busSendTest from '../pages/busSendTest.vue';
import busGetTest from '../pages/busGetTest.vue';

const nav = [
    {
        path: '/home',
        name: 'home',
        component: home
    },
    {
        path: '/vfor_test',
        name: 'vfor_test',
        component: vfor_test
    },
    {
        path: '/busSendTest',
        name: 'busSendTest',
        component: busSendTest
    },
    {
        path: '/busGetTest',
        name: 'busGetTest',
        component: busGetTest
    },]


export default nav