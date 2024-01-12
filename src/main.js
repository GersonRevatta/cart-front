import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import VueAxios from 'vue-axios'


// Primefaces
import PrimeVue from 'primevue/config'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import ToastService from 'primevue/toastservice'

import store from './store';

import App from './App.vue'
import router from './router'

// Axios settings
import axios from './axios'


const app = createApp(App)

app.use(store);
app.use(router)
app.use(VueAxios, axios)
app.use(PrimeVue)
app.use(ToastService);

app.config.globalProperties.$filters = {
  truncate(text, length, suffix) {
    if (text.length > length) return (text.substring(0, length) + suffix);
    return text;
  },
};

app.mount('#app')
