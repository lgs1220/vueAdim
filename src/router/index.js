import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = () => import('../views/Login')
const Layout = () => import('../views/Layout/index')
const index = () => import('../views/Index')
const menu = () => import('../views/System/Menu')
const role = () => import('../views/System/Role')
const user = () => import('../views/System/User')

const banner = () => import('../views/Shop/Banner')
const goods = () => import('../views/Shop/Goods')
const member = () => import('../views/Shop/Member')
const seckill = () => import('../views/Shop/Seckill')
const category = () => import('../views/Shop/Category')
const specs = () => import('../views/Shop/specs')

let router = new Router({
  routes: [
    {
      path: '/login',
      component: login,
      meta: { title: '登陆页' }
    },
    {
      path: '/',
      component: Layout,
      meta: { title: 'xx管理系统' },
      children: [
        {
          path: '/index',
          component: index,
          meta: { title: '后台主页' }
        },
        {
          path: '/menu',
          component: menu,
          meta: { title: '菜单管理' }
        },
        {
          path: '/role',
          component: role,
          meta: { title: '角色管理' }
        },
        {
          path: '/user',
          component: user,
          meta: { title: '管理员管理' }
        },
        {
          path: '/banner',
          component: banner,
          meta: { title: '轮播管理' }
        },
        {
          path: '/category',
          component: category,
          meta: { title: '商品分类' }
        },
        {
          path: '/goods',
          component: goods,
          meta: { title: '商品管理' }
        },
        {
          path: '/member',
          component: member,
          meta: { title: '会员管理' }
        },
        {
          path: '/seckill',
          component: seckill,
          meta: { title: '秒杀活动' }
        },
        {
          path: '/specs',
          component: specs,
          meta: { title: '商品规格' }
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();
})

export default router