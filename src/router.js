import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import login from './views/login'
import moren from './components/home/layout-zuye.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { // 通配404
      path: '*',
      component: () => import('./views/404.vue')
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: moren
        },
        { // 挂载评论列表路由
          path: '/home/comment',
          component: () => import('./views/comment/index.vue')
        },
        {// 挂载素材管理路由
          path: '/home/material',
          component: () => import('./views/material/index.vue')
        },
        // 内容列表路由
        {
          path: '/home/articles',
          component: () => import('./views/articles/index.vue')

        },
        // 发表文章路由
        {
          path: '/home/publish',
          component: () => import('./views/publish/index.vue')
        },
        {
          path: '/home/publish/:articleId', // 编辑路由,用的是动态路由
          component: () => import('./views/publish/index.vue')
        },
        // 账户信息
        {
          path: '/home/account',
          component: () => import('./views/account/index.vue')
        },
        // eachr图表 图文数据
        {
          path: '/home/fansdata',
          component: () => import('./views/fans/index.vue')
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
