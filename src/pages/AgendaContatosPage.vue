<script setup>
import { ref, provide, onMounted, toRaw } from 'vue';
import Paginator from 'primevue/paginator';
import Dialog from 'primevue/dialog';
import BarraBusca from '@/components/BarraBusca.vue';
import ContatoForm from '@/components/ContatoForm.vue'
import Button from 'primevue/button'
import 'primeicons/primeicons.css'


const busca = ref({})

const contatos = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalRecords = ref(0)
const visible = ref(false)
const contatoEditavel = ref({})
const deletar = ref(false)
const contatoId =ref()



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
    const queryParams = Object.keys(toRaw(busca.value))
        .filter((key) => busca.value[key])
        .map(key => `${key.toLowerCase()}=${encodeURIComponent(busca.value[key])}`)
        .join('&');
    const searchString =`&${queryParams}`
    fetchFilter(searchString);
}

function abrirDeleteModal(id) {
    contatoId.value = id
    deletar.value = true
}

function deletarContato() {
    console.log(contatoId.value)
    fetch(`/api/deletar.php?id=${contatoId.value}`, { method: 'DELETE'})
    .then(() => status = alert('Contato deletado com sucesso!'))
    deletar.value = false
    fetchContatos()
}

function abrirEditModal(contato) {
    contatoEditavel.value = contato
    visible.value = true
}


async function editarContato(contato) {
contato = {
    id: toRaw(contatoEditavel.value.id),
    nome: contato.nome,
    email: contato.email,
    ddi: contato.ddi,
    ddd: contato.ddd,
    telefone: contato.telefone
    }
const requestOptions = {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(contato)
    }
    fetch(`/api/editar.php`, requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
          alert(data.message);
          } else {
        visible.value = false;
        location.reload()
        alert("Contato editado com sucesso!");
      }
    })
}


onMounted(() => {
    fetchContatos()
});
</script>

<template>
    <div class="container mx-auto px-4">
        <div>
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Lista de contatos</h2>
            <table class=" text-gray-500 dark:text-gray-400">
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
                        <th scope="col" class="pl-6">
                            <Button type="search" class="pl-6" @click="buscarContato">Filtrar</Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contato in contatos" :key="contato.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="text-left px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ contato.nome }}
                        </th>
                        <td class="px-6 py-4">{{ contato.email }}</td>
                        <td class="px-6 py-4">{{ contato.ddi }}</td>
                        <td class="px-6 py-4">{{ contato.ddd }}</td>
                        <td class="px-6 py-4">{{ contato.telefone }}</td>
                        <td class="px-6 py-4">
                            <div class="justify-center flex">
                                <Button class="justify-center invisible" @click="abrirEditModal(toRaw(contato))">
                                    <i class="pi pi-pencil visible" style="color: black; font-size: 120%"></i>
                                </Button>
                                <Button class="justify-center invisible" @click="abrirDeleteModal(contato.id)">
                                    <i class="pi pi-trash visible" style="color: red; font-size: 120%"></i>
                                </Button>
                            </div>
                        </td>
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
    <Dialog v-model:visible="deletar" modal header="Deletar Contato" :style="{ width: '25rem' }" >
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Tem certeza que deseja deletar esse contato?</span>
        <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="deletar = false"></Button>
        <Button type="button" label="Deletar" @click="deletarContato"></Button>
        </div>
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
    text-align: auto;
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