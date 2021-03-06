import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShoopingCart from '../views/ShoopingCart.vue'
import SuccessShayna from '../views/Success.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'Product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue')
  },
  {
    path: '/shoopingcart',
    name: 'ShoopingCart',
    component: ShoopingCart
  },
  {
    path: '/success',
    name: 'SuccessShayna',
    component: SuccessShayna
  },
]

const router = new VueRouter({
  routes
})

export default router
