import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './index.css'
import PrimeVue from 'primevue/config';
import Lara from '@/presets/Lara';
import { CIcon } from '@coreui/icons-vue';
import {
    cilArrowBottom,
    cilArrowRight,
    cilArrowTop,
    cilBan,
    cilBasket,
    cilBell,
    cilCalculator,
    cilCalendar
  } from '@coreui/icons'

  const icons = {
    cilArrowBottom,
    cilArrowRight,
    cilArrowTop,
    cilBan,
    cilBasket,
    cilBell,
    cilCalculator,
    cilCalendar
  }

const app = createApp(App)

app.provide('icons', icons)
app.component('CIcon', CIcon)

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara
})
// app.use(router);
app.use(createPinia())
app.mount('#app')


