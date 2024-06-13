<script>
import AgendaContatos from './components/AgendaContatos.vue';
import Header from './components/Header.vue';
import CadastroContatos from './components/CadastroContatos.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: AgendaContatos },
  { path: '/cadastro', component: CadastroContatos },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default {
    name: 'App',
    components: {
        Header,
        AgendaContatos,
        CadastroContatos,
    }
};
</script>


<template>
    <div id="app">
        <Header class="pb-40"/>
        <AgendaContatos />
        <CadastroContatos />
    </div>
</template>

