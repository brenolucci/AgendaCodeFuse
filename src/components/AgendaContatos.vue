<script>
import { ref, provide } from 'vue';
import Paginator from 'primevue/paginator';
import BarraBusca from './BarraBusca.vue';
import { CIcon } from '@coreui/icons-vue';
import { cilDelete, cilPencil } from '@coreui/icons'

export default {
    name: 'AgendaContatos',
    components: {
        Paginator,
        BarraBusca,
        CIcon,

    },
    setup() {
        const busca = ref({
            Nome: '',
            Email: '',
            DDI: '',
            DDD: '',
            Telefone: ''
        });

        provide('busca', busca);

        return {
            busca,
            cilDelete,
            cilPencil,
        };
    },
    data() {
        return {
            contatos: [],
            currentPage: 1,
            itemsPerPage: 10,
            totalRecords: 0,
        };
    },
    methods: {
        fetchContatos() {
            fetch(`${import.meta.env.VITE_API_ADDR}/get-pessoas.php/?pagina=${this.currentPage}&limit=${this.itemsPerPage}`)
                .then(response => response.json())
                .then(data => {
                    this.contatos = data.data;
                    this.totalRecords = data.totalRecords;
                })
                .catch(error => {
                    console.error('Error fetching contatos:', error);
                });
        },
        fetchFilter(searchString) {
            fetch(`${import.meta.env.VITE_API_ADDR}/get-pessoas.php/?pagina=${this.currentPage}&limit=${this.itemsPerPage}${searchString}`)
                .then(response => response.json())
                .then(data => {
                    this.contatos = data.data;
                    this.totalRecords = data.totalRecords;
                })
                .catch(error => {
                    console.error('Error fetching contatos:', error);
                });
        },

        paginateContatos(event) {
            this.itemsPerPage = event.rows;
            this.currentPage = event.page + 1;

            this.fetchContatos();
        },
        /**
         * Cria uma queryString concatenando os campos de buscas que não são vazios e a inclui no GET chamando o fetchFilter() 
         * @param {obj} busca
         * @return 
         */

         /** */
        buscarContato() {
            const queryParams = Object.keys(this.busca)
                .filter(key => this.busca[key])
                .map(key => `${key.toLowerCase()}=${encodeURIComponent(this.busca[key])}`)
                .join('&');
            const searchString =`&${queryParams}`
            console.log(searchString)
            this.fetchFilter(searchString);
        },
        deletarContato(id) {
            fetch(`${import.meta.env.VITE_API_ADDR}/deletar.php?id=${id}`, { method: 'DELETE'})
            .then(() => this.status = 'Contato deletado com sucesso!')
        }
    },
    mounted() {
        this.fetchContatos();
    }
};
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
                            <CIcon class="px-2 py-2" :icon="cilPencil" size="sm"/>
                            <CIcon class="px-2 py-2" :icon="cilDelete" size="sm"/>
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