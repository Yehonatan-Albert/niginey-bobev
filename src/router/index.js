import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ComposersPage from '../views/ComposersPage.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import NiginimPage from '../views/NiginimPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/composer/:name', component: ComposersPage },
  { path: '/:pathMatch(.*)*', component: NotFoundPage },
  { path: '/nigen/:id', component: NiginimPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
