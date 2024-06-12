<script>
import {ref} from 'vue';
import Paginator from 'primevue/paginator';

export default {
    name: 'AgendaContatos',
    components: {
        Paginator,
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
        paginateContatos(event) {
            this.itemsPerPage = event.rows;
            this.currentPage = event.page + 1;

            this.fetchContatos();
        },
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
            <table class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Nome</th>
                        <th scope="col" class="px-6 py-3">Email</th>
                        <th scope="col" class="px-6 py-3">DDI</th>
                        <th scope="col" class="px-6 py-3">DDD</th>
                        <th scope="col" class="px-6 py-3">Telefone</th>
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
                        <td class="px-6 py-4">{{ contato.telefone }}</td>
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
