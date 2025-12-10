import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home.vue'
import LoginPage from '../views/login.vue'
import Segnalazioni from '../views/segnalazioni.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/segnalazioni',
      name: 'Segnalazioni',
      component: Segnalazioni,
      meta: { requiresAuth: true }
    }
  ]
})

// Controlla se l'utente è loggato, se non è loggato lo porta alla pagina di login
router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
