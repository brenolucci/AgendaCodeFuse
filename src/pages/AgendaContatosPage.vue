<script setup>
import { ref, provide, onMounted, toRaw } from 'vue';
import Paginator from 'primevue/paginator';
import Dialog from 'primevue/dialog';
import BarraBusca from '@/components/BarraBusca.vue';
import { CIcon } from '@coreui/icons-vue';
import { cilDelete, cilPencil } from '@coreui/icons'
import ContatoForm from '@/components/ContatoForm.vue'

// Problema - Paginacao de contatos
// - Pegar contatos paginados;
// - Controlar o numero total de paginas;
// - Controlar o numero total de itens por pagina;
// - Verificar pagina atual; OK

const busca = ref({
    nome: '',
    email: '',
    ddi: '',
    ddd: '',
    telefone: ''
})

const obj = { nome: 'Vitor', sobrenome: 'Borges '};

// Object.keys(obj) = [nome, sobrenome]
// Object.values(obj) = [Vitor, Borges]
// Object.entries(obj) = [ [nome, Vitor], [sobrenome, Borges] ]
// Object.keys(busca.value) -> ['nome', 'email', 'ddi', 'ddd', 'telefone'];

const contatos = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalRecords = ref(0)
const visible = ref(false)
const contatoEditavel = ref(null)

provide('busca', busca);

function fetchContatos() {
    fetch(`/api/get-pessoas.php/?pagina=${currentPage.value}&limit=${itemsPerPage.value}`)
        .then(response => response.json())
        .then(data => {
            contatos.value = data.data;
            totalRecords.value = data.totalRecords;
        })
        .catch(error => {
            console.error('Error fetching contatos:', error);
        });
}

function fetchFilter(searchString) {
    fetch(`/api/get-pessoas.php/?pagina=${currentPage.value}&limit=${itemsPerPage.value}${searchString}`)
        .then(response => response.json())
        .then(data => {
            contatos.value = data.data;
            totalRecords.value = data.totalRecords;
        })
        .catch(error => {
            console.error('Error fetching contatos:', error);
        });
}

function paginateContatos(event) {
    itemsPerPage.value = event.rows;
    currentPage.value = event.page + 1;

    fetchContatos();
}

function buscarContato() {
    const queryParams = Object.keys(busca)
        .filter((key) => busca[key])
        .map(key => `${key.toLowerCase()}=${encodeURIComponent(busca[key])}`)
        .join('&');
    const searchString =`&${queryParams}`
    console.log(searchString)
    fetchFilter(searchString);
}

function deletarContato(id) {
    // console.log(id)
    fetch(`/api/deletar.php?id=${id}`, { method: 'DELETE'})
    // eslint-disable-next-line no-global-assign
    .then(() => status = 'Contato deletado com sucesso!')
}

function abrirEditModal(contato) {
    contatoEditavel.value = contato
    visible.value = true
}

function editarContato(contato) {
    contato
    console.log(contato);
}

onMounted(() => {
    fetchContatos()
});
</script>

<template>
    <div class="container mx-auto px-4">
        <div class="relative overflow-x-auto">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Lista de contatos</h2>
            <table class="table-auto w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            <BarraBusca label="Nome" />
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <BarraBusca label="Email" />
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <BarraBusca label="DDI" />
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <BarraBusca label="DDD" />
                        </th>
                        <th scope="col" class="px-6 py-3">
                            <BarraBusca label="Telefone" />
                        </th>
                        <th class="d-flex">
                            <button type="search"
                                class="justify-center px-1 py-1 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                @click="buscarContato">
                                Filtrar
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contato in contatos" :key="contato.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ contato.nome }}
                        </th>
                            <td class="px-6 py-4">{{ contato.email }}</td>
                            <td class="px-6 py-4">{{ contato.ddi }}</td>
                            <td class="px-6 py-4">{{ contato.ddd }}</td>
                            <td class="px-6 py-4">{{ contato.telefone }}
                        </td>
                        <div class=" align-middle flex px-1 py-1">
                            <CIcon @click="abrirEditModal(contato)" class="px-2 py-2" :icon="cilPencil" size="sm"/>
                            <CIcon @click="deletarContato(contato.id)" class="px-2 py-2" :icon="cilDelete" size="sm"/>
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>

        <Paginator
            :rows="itemsPerPage"
            :totalRecords="totalRecords"
            :first="(currentPage - 1) * itemsPerPage"
            :rowsPerPageOptions="[1, 2, 5, 10, 20, 30]"
            @page="paginateContatos"
        />
    </div>

    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <ContatoForm :contatoData="contatoEditavel"  labelBotao="Salvar" @mandar="editarContato" />
    </Dialog>
</template>

<style scoped>
.agenda {
    max-width: 100%;
    margin: 0 auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.header input {
    flex: 1;
    margin-right: 10px;
    padding: 5px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th,
table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination a {
    padding: 5px 10px;
    cursor: pointer;
}
</style>