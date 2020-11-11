import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import register from './views/register.vue'
import board from './views/list1.vue'
import mytask from './views/mytask.vue'
import member from './views/members.vue'
import memberSetting from './views/member-setting.vue'
import { nextTick } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/:board',
    name: 'board',
    component: board
  },
  {
    path: '/mytask',
    name: 'mytask',
    component: mytask
  },
  {
    path: '/members',
    name: 'member',
    component: member
  },
  {
    path: '/member-setting',
    name: 'member-setting',
    component: memberSetting
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Login' || to.name === 'register') {
    next()
  } else {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
