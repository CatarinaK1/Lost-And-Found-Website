import '@fontsource/space-grotesk';
import './main.css'
import router from './router';

import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';


const app = createApp(App);


const options = {
    position: 'top-right',
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
};

app.use(router);
app.use(Toast,options);
app.mount('#app');