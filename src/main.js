import { createApp } from 'vue'

// global storage plugin
import { createPinia } from "pinia";

import App from './App.vue'

// UI components that used almost everywhere
import components from '@/components/UI'

const app = createApp(App);

// global registration of UI components such as VerticalLine
components.forEach(component => {
    app.component(component.name, component);
});

// mounting of app with global storage
app.use(createPinia()).mount('#app');

// tool for debugging in template listeners
console.log(app.config.globalProperties.$log = console);