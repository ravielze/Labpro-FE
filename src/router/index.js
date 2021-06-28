import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  },
  {
    path: '/dorayaki',
    name: 'My Dorayaki',
    component: () => import('../pages/Dorayaki.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
