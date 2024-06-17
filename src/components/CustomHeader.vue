<script setup>
import Button from 'primevue/button'
</script>

<template>
    <nav class="bg-white border-gray-200 dark:bg-gray-900 px-1 pb-2">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <!--Logo da codefuse-->
            <router-link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="../assets/codefuse-logo.svg" class="h-16" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            </router-link>
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                <ul
                    class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <!-- <router-link to="/cadastro" tag="Button"
                            class=" w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            aria-current="page">
                            </router-link> -->
                            <!-- Nova versão usando o Router-link dentro de um botão com o $router.push('/cadastro') -->
                        <Button @click="$router.push('/cadastro')">Cadastrar contato</Button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>