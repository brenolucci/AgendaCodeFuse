import { createRouter, createWebHistory } from 'vue-router'
import AgendaContatos from '../components/AgendaContatos.vue'
import CadastroContatos from '../components/CadastroContatos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AgendaContatos
    },
    {
      path: '/cadastro',
      name: 'register',
      component: CadastroContatos
    }
  ]
})

export default router