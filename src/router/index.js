import { createRouter, createWebHistory } from 'vue-router'
import WelcomePage from '../views/welcome.vue'
import HomePage from '../views/home.vue'
import LoginPage from '../views/login.vue'
import Segnalazioni from '../components/segnalazioni/views/segnalazioni.vue'
import RegisterPage from '../views/register.vue'
import CreaSegnalazione from '../components/segnalazioni/views/creaSegnalazione.vue'
import Dashboard from '../components/profilo/index.vue'
import Iniziative from '../components/iniziative/iniziative.vue';
import CreaIniziativa from '../components/iniziative/creaIniziativa.vue';
import Classifica from '../components/classifica/classifica.vue';
import Swagger from '../views/api-docs.vue';
import NotFound from '../views/404.vue'
//import is from '../components/segnalazioni/index.vue'
import { loggedUser } from '../states/user'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomePage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/api-docs',
      name: 'api-docs',
      component: Swagger
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true }
    },
    {
      path: '/segnalazioni',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'crea',
          name: 'Crea Segnalazione',
          component: CreaSegnalazione
        },
        {
          path: '',
          name: 'Segnalazioni',
          component: Segnalazioni,
        }
      ]
    },
    {
      path: '/iniziative',
      meta: { requiresAuth: true },
      component: Iniziative
    },
    {
      path: '/iniziative/crea',
      meta: { requiresAuth: true },
      component: CreaIniziativa
    },
    {
      path: '/classifica',
      meta: { requiresAuth: true },
      component: Classifica
    },
    {
      path: '/me',
      meta: { requiresAuth: true },
      component: Dashboard
    },
    
    {
    // !---Deve essere l'ultima route
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
    }
  ]
})

// Controlla se l'utente è loggato, se non è loggato lo porta alla pagina di login
router.beforeEach((to, from, next) => {
  const loggedIn = !!loggedUser.token;

  //se un utente loggato va al login, viene portato alla home
  /*in teoria non serve
  if ((to.path === '/login' || to.path === '/register')&& loggedIn) {
    next('/')
    return
  }*/

  // Se **qualunque route del matched array** richiede auth
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !loggedIn) {
    next('/welcome');
  }else if(!requiresAuth && loggedIn) {
    next('/')
  } else {
    next();
  }
});

export default router
