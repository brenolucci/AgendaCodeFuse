<template>
    <div class="container mx-auto px-4">
        <div class="relative overflow-x-auto">
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
                    <tr v-for="contato in paginatedContatos" :key="contato.id"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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

        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
            <span>{{ currentPage }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AgendaContatos',
    data() {
        return {
            contatos: [],
            currentPage: 1,
            itemsPerPage: 10,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.contatos.length / this.itemsPerPage);
        },
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
        endIndex() {
            return this.currentPage * this.itemsPerPage;
        },
        paginatedContatos() {
            return this.contatos.slice(this.startIndex, this.endIndex);
        }
    },
    methods: {
        fetchContatos() {
            fetch('http://localhost/agenda/html/get-pessoas.php')
                .then(response => response.json())
                .then(data => {
                    this.contatos = data;
                })
            console.log(data)
                .catch(error => {
                    console.error('Error fetching contatos:', error);
                });
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    },
    mounted() {
        this.fetchContatos();
    }
};
</script>

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

.pagination button {
    padding: 5px 10px;
}
</style>
