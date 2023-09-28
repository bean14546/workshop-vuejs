import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'BlankLayout',
    component: () => import('../layout/blank.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/login.vue')
      },
    ]
  },
  {
    path: '/frontend',
    name: 'FrontendLayout',
    component: () => import('../layout/frontend.vue'),
    children: [
      {
        path: 'shop',
        name: 'shop',
        component: () => import('../views/store/shop.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/cart.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/store/index.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
