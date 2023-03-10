import login from '../pages/login.vue';
import home from '@/pages/home';
import q1 from '@/pages/testRouter/q.vue';
import wrap from '@/pages/wrap';
const router = [
  {
    path: '/',
    // name: 'home',
    component: wrap,
    meta: {
      title: 'home',
      keepAlive: false
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: home
      },
      {
        path: 'q',
        name: 'q',
        component: q1
      },
      {
        path: 'arithmetic',
        name: 'arithmetic',
        component: ()=> import('@/pages/arithmetic/index')
      },
      {
        path: 'smallTools',
        name: 'smallTools',
        component: ()=> import('@/pages/smallTools/index')
      },
      {
        path: 'vfor_test',
        name: 'vfor_test',
        component: ()=> import('@/pages/vfor_test')
      },
      {
        path: 'busSendTest',
        name: 'busSendTest',
        component: ()=> import('@/pages/busSendTest')
      },
      {
        path: 'busGetTest',
        name: 'busGetTest',
        component: ()=> import('@/pages/busGetTest')
      },
      {
        path: 'computeTest',
        name: 'computeTest',
        component: ()=> import('@/pages/computeTest')
      },
      {
        path: 'directiveTest',
        name: 'directiveTest',
        component: ()=> import('@/pages/directiveTest')
      },
      {
        path: 'betterScroll',
        name: 'betterScroll',
        component: ()=> import('@/pages/betterScroll/index')
      },
      {
        path: 'copyDemo',
        name: 'copyDemo',
        component: ()=> import('@/pages/directiveTest/copyDemo')
      },
      {
        path: 'pinyin',
        name: 'pinyin',
        component: ()=> import('@/pages/pinyin/index')
      },
      {
        path: 'uploadTest',
        name: 'uploadTest',
        component: ()=> import('@/pages/uploadtest')
      },
      {
        path: 'downloadExcal',
        name: 'downloadExcal',
        component: ()=> import('@/pages/downloadExcal')
      },

      {
        path: 'canvasTest',
        name: 'canvasTest',
        component: ()=> import('@/pages/canvas/canvasTest')
      },
      {
        path: 'drop_shadow',
        name: 'drop_shadow',
        component: ()=> import('@/pages/cssDemo/drop_shadow')
      },
      {
        path: 'transition',
        name: 'transition',
        component: ()=> import('@/pages/transitionTest/transition')
      },
      {
        path: 'componentTest',
        name: 'componentTest',
        component: ()=> import('@/pages/componentTest/componentFn')
      },
      {
        path: 'emojiTest',
        name: 'emojiTest',
        component: ()=> import('@/pages/emojiTest/index')
      },
      {
        path: 'knowledgePoint',
        name: 'knowledgePoint',
        component: ()=> import('@/pages/knowledgePoint/index')
      },
      {
        path: 'flextest',
        name: 'flextest',
        component: ()=> import('@/pages/cssDemo/flextest')
      },
      {
        path: 'btnsChange',
        name: 'btnsChange',
        component: ()=> import('@/pages/cssDemo/btnsChange')
      },
      {
        path: 'avTest',
        name: 'avTest',
        component: ()=> import('@/pages/avTest/index')
      },
      {
        path: 'dragDemo',
        name: 'dragDemo',
        component: ()=> import('@/pages/dragDemo/index')
      },
      {
        path: 'dragDemo2',
        name: 'dragDemo2',
        component: ()=> import('@/pages/dragDemo/indexVersion1')
      },
      {
        path: 'indexVersion2',
        name: 'indexVersion2',
        component: ()=> import('@/pages/dragDemo/indexVersion2')
      },
      {
        path: 'ctrlZ+Y',
        name: 'ctrlZ+Y',
        component: ()=> import('@/pages/ctrlZ+Y/index')
      },
      {
        path: 'screenfull',
        name: 'screenfull',
        component: ()=> import('@/pages/screenfull/index')
      }
    ]
  }
];

export default router;