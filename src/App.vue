  <script>
  import AgendaContatos from './components/AgendaContatos.vue';
  import Header from './components/Header.vue';
  import CadastroContatos from './components/CadastroContatos.vue';
  import { RouterLink, RouterView } from 'vue-router';
  
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
      <Header class="pb-20"/>
      <RouterView />
    </div>
  </template>
  
  