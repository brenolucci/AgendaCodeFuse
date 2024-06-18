<script setup lang="ts">
import { reactive, toRaw } from 'vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

interface Contato {
  nome: string,
  email: string,
  ddi: number,
  ddd: number,
  telefone: string
}
type Props = { labelBotao?: string; contatoData?: Contato };
//props é definido nome: tipo
const props = withDefaults(defineProps<Props>(), { labelBotao: 'Salvar Contato'});

//eventos
const events = defineEmits([
    'mandar' 
])

// Reactive permite que o contatoForm seja reativo.
const contatoForm = reactive<Contato>({
  nome: '',
  email: '',
  ddi: 0,
  ddd: 0,
  telefone: ''
});

if (props.contatoData) {
    contatoForm.nome = props.contatoData.nome
    contatoForm.email = props.contatoData.email
    contatoForm.ddi = props.contatoData.ddi
    contatoForm.ddd = props.contatoData.ddd
    contatoForm.telefone = props.contatoData.telefone
}

function numberValidation(){
    if (contatoForm.ddi.toString().length > 3) {
        
    }

}


</script>

<template>
  <form @submit.prevent="$emit('mandar', toRaw(contatoForm))" class="space-y-8"> 
    <div>
      <label for="nome" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nome</label>
      <InputText v-model="contatoForm.nome" id="nome" class="w-full" placeholder="Ex: James Bond" required />
    </div>
    <div>
      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
      <InputText v-model="contatoForm.email" type="email" id="email" class="w-full" placeholder="Ex: seuemail@provedor.com" required />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label for="DDI" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">DDI</label>
        <InputText v-model="contatoForm.ddi" type="number" id="DDI" class="w-full" placeholder="55" required />
      </div>
      <div>
        <label for="DDD" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">DDD</label>
        <InputText v-model="contatoForm.ddd" type="number" id="DDD" class="w-full" placeholder="61"  required />
      </div>
      <div>
        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Telefone</label>
        <InputText v-model="contatoForm.telefone" type="text" id="phone" class="w-full" placeholder="99999989" required />
      </div>
    </div>
    <Button type="submit" required>{{ props.labelBotao }}</Button>
  </form>
</template>