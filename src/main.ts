import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import PrimeVue from 'primevue/config';
import router from './router/index.js';
import 'primevue/resources/themes/aura-light-green/theme.css';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(createPinia())
app.mount('#app')