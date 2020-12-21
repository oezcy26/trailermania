import Vue from 'vue'
import VueRouter from 'vue-router'

import Filmpalast from '../views/Filmpalast.vue'
import Bs from '../views/Bs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Filmpalast',
    component: Filmpalast
  },
  {
    path: '/bs',
    name: 'Bs',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Bs
  }
]

const router = new VueRouter({
  routes
})

export default router
