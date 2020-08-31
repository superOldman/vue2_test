import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue';
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
    ]
})

router.beforeEach((to, from, next) => {
    let json = sessionStorage.getItem('router');
    if (json) {
        json = JSON.parse(json);
        json.forEach(e => {
            let cp = e.component;
            console.log(`./${cp}.vue`);
            e.component = () => import(`../pages/${cp}.vue`);
        });

        let arr = [
            {
                path: "/home",
                name: "wrap",
                component: () => import("../pages/wrap.vue"),
                children: [...json]
            }
        ];
        if (router.options.routes.length <= 2) {
            router.options.routes.push(arr[0]);
            router.addRoutes(arr);
            router.push(to.path)
        }
    }

    next()
})


export default router