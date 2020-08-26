import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue';

// import wrap from '../pages/wrap.vue';
// import nav from '../nav/nav';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
const router = new Router({
    mode: 'hash',
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: () => {
                return 'login';
            }
        },
        {
            path: '/login',
            name: 'login',
            component: login,
        },
        // {
        //     path: '/home',
        //     name: 'wrap',
        //     component: wrap,
        //     children:[
        //         ...nav
        //     ]
        // }
    ]
})



export default router