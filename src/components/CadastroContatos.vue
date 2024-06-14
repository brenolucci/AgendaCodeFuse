  
  <script setup>
  import { reactive } from 'vue';
  
  const contato = reactive({
    nome: '',
    email: '',
    ddi: '',
    ddd: '',
    telefone: ''
  });
  
  /**
   * Cria um novo contato no banco de dados através do verbo POST
   * @param contato
   * @return json
   */
  function criarContato() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(contato)
    };
    fetch(`${import.meta.env.VITE_API_ADDR}/criar.php`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.message);
        } else {
          alert("Contato criado com sucesso!");
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao criar contato');
      });
  }
  </script>

<template>
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Cadastrar novo contato
        </h2>
        <form @submit.prevent="criarContato" class="space-y-8">
          <div>
            <label for="nome" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nome</label>
            <input v-model="contato.nome" type="text" id="nome" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="fulano de tal" required>
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
            <input v-model="contato.email" type="email" id="email" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="seuemail@provedor.com">
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label for="DDI" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">DDI</label>
              <input v-model="contato.ddi" type="text" id="DDI" class="p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="55">
            </div>
            <div>
              <label for="DDD" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">DDD</label>
              <input v-model="contato.ddd" type="text" id="DDD" class="p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="61">
            </div>
            <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Telefone</label>
              <input v-model="contato.telefone" type="text" id="phone" class="p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="99999989">
            </div>
          </div>
          <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
        </form>
      </div>
    </section>
  </template>
  