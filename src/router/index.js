import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import ComposersPage from '../views/ComposersPage.vue'
import NotFound from '../views/NotFoundPage.vue'
import NiginimPage from '../views/NiginimPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/composer/:name', component: ComposersPage },
  { path: '/:pathMatch(.*)*', component: NotFound },
  { path: '/nigen/:id', component: NiginimPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
