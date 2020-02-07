import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/LoginIndex/Auth'
import Input from '@/components/LoginIndex/Input'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    children: [
      {
        path: 'input',
        name: '输入密码登录',
        component: Input,
      },{
        path: 'auth',
        name: '扫码登录',
        component: Auth,
      },
    ]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '个人中心',
    component: Layout,
    children: [
      {
        path: 'https://github.com/xu-chao/tensorflow',
        meta: { title: '个人中心', icon: 'github' }
      }
    ]
  },

  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/user',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'setting' },
    children: [
      {
        path: 'doc',
        name: '接口文档',
        component: () => import('@/views/doc/swagger'),
        meta: { title: '接口文档', icon: 'documentation' }
      },
      {
        path: 'user',
        name: '用户管理',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'peoples' }
      },
    ]
  },

  {
    path: '/monitor',
    component: Layout,
    redirect: '/monitor/admin',
    name: '系统监控',
    meta: { title: '系统监控', icon: 'springcloud' },
    children: [
      {
        path: 'admin',
        name: '服务监控',
        component: () => import('@/views/monitor/admin'),
        meta: { title: '服务监控', icon: 'service-monitor' }
      },
      {
        path: 'zipkin',
        name: '链路监控',
        component: () => import('@/views/monitor/zipkin'),
        meta: { title: '链路监控', icon: 'zipkin' }
      },
      {
        path: 'eureka',
        name: '注册中心',
        component: () => import('@/views/monitor/eureka'),
        meta: { title: '注册中心', icon: 'service-center' }
      },
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
