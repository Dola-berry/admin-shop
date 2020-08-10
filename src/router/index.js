import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/views/Index'
import Layout from '@/components/views/Layout'
import Login from '@/components/views/Login'
import Category from '@/components/views/Category'
import User from '@/components/views/User'
import Specs from '@/components/views/Specs'
import Member from '@/components/views/Member'
import Role from '@/components/views/Role'
import Banner from '@/components/views/Banner'
import Seckill from '@/components/views/Seckill'
import Goods from '@/components/views/Goods'
import Menu from '@/components/views/Menu'
Vue.use(Router)

let route = new Router({
  mode: 'history',
  routes: [
    {
      //登录页
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [

        {
          //菜单页面
          path: 'menu',
          name: 'Menu',
          component: Menu,
        },
        {
          //分类页面
          path: 'category',
          name: 'Category',
          component: Category,
        },
        {
          //管理员页面
          path: 'user',
          name: 'User',
          component: User,
        },
        {
          //规格列表
          path: 'specs',
          name: 'Specs',
          component: Specs,
        },
        {
          //会员管理
          path: 'member',
          name: 'Member',
          component: Member,
        },
        {
          //角色管理
          path: 'role',
          name: 'Role',
          component: Role,
        },
        {
          //轮播图管理
          path: 'banner',
          name: 'Banner',
          component: Banner,
        },
        {
          //限时秒杀列表
          path: 'seckill',
          name: 'Seckill',
          component: Seckill,
        },
        {
          //商品列表
          path: 'goods',
          name: 'Goods',
          component: Goods,
        },
        {
          //首页
          path: 'index',
          name: 'Index',
          component: Index,
        },
        {
          //默认为首页
          path: '',
          component: Index,
        },
      ]
    }
  ]
})
route.beforeEach((to, from, next) => {
  let list = JSON.parse(sessionStorage.getItem('list')) ? JSON.parse(sessionStorage.getItem('list')) :'';
  // console.log(username);
  if (list) {
    //用户访问的不是login 登录页
    if(to.path == "/login"){
      next("/")
    }else{
      // 首页 都可去
      if(to.path == "/index" || "/"){
        next()
      }else{
        // 当前身份是否可去当前路由
        let flag = list.menus_url.find(item => item == to.path);
        if(flag){
          next()
        }else{
          console.log("当前权限受限");
          next(false)
        }
      }
    }
  } else {
    // 没有登陆
    if (to.path == "/login") {
      next();
    } else {
      alert('请先登录')
      next("/login");
    }
  }
})
export default route;