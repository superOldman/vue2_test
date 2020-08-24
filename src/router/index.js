import Vue from 'vue'
import Router from 'vue-router'
import wrap from '../pages/wrap.vue';
import nav from '../nav/nav';
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
export default new Router({
    // mode: 'hash',
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: () => {
                return 'home';
            }
        },
        // {
        //     path: '/wrap',
        //     name: 'warp',
        //     component:[]
        // },
        {
            path: '/home',
            name: 'home',
            component: wrap,
            children:[
                ...nav
            ]
        }
    ]
})