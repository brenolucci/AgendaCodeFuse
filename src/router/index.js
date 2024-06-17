import { createRouter, createWebHistory } from 'vue-router'
import HeaderLayout from '@/layouts/HeaderLayout.vue'
import AgendaContatosPage from '@/pages/AgendaContatosPage.vue'
import CadastroContatosPage from '@/pages/CadastroContatosPage.vue'
import LoginPage from '@/pages/LoginPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'HeaderLayout',
      path: '/',
      component: HeaderLayout,
      children: [
        {
          name: 'Home',
          path: '/',
          component: AgendaContatosPage
        },
        {
          path: '/cadastro',
          name: 'register',
          component: CadastroContatosPage
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: LoginPage
    }
  ]
})

export default router