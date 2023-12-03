import Vue from 'vue'
import VueRouter from 'vue-router'
import AppVue from '@/App.vue'
import LoginView from '@/views/LoginView.vue'
import StatsView from '@/views/StatsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component:  {AppVue}
  },
  {
    path: '/about',
    name: 'about',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/stats',
    name: 'stats',
    component: StatsView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
