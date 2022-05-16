import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'

import {debounce} from "debounce";

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
});

app.use(debounce).mount('#app');

app.config.globalProperties.$log = console.log