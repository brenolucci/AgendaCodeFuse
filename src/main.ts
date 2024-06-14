import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import PrimeVue from 'primevue/config';
import router from './router/index.js';
import Lara from '@/presets/Lara';


const app = createApp(App)
   


app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara,

})
// app.use(router);
app.use(createPinia())
app.mount('#app')


