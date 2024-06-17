<script setup>
import ContatoForm from '@/components/ContatoForm.vue';

function criarContato(contato) {
  console.log(contato)

  const requestOptions = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(contato)
  };
  fetch(`/api/criar.php`, requestOptions)
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
      <ContatoForm labelBotao="Cadastrar" @mandar="criarContato" />
    </div>
  </section>
</template>