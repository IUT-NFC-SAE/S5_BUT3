import Vue from 'vue'
import VueRouter from 'vue-router'
import AppVue from '@/App.vue'
import LoginForm from '@/views/LoginForm.vue'
import BarChart from '@/components/BarChartComponent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component:  {AppVue, BarChart}
  },
  {
    path: '/about',
    name: 'about',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
