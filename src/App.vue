<template>
    <div id="app">
        <Header class="pb-40" />
        <AgendaContatos />
        <CadastroContatos />
    </div>
</template>

<script>
import AgendaContatos from './components/AgendaContatos.vue';
import Header from './components/Header.vue';
import CadastroContatos from './components/CadastroContatos.vue'

export default {
    name: 'App',
    components: {
        Header,
        AgendaContatos,
        CadastroContatos,
    }
};
</script>
