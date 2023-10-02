import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/routes/router';
import VueDatePicker from '@vuepic/vue-datepicker';
import App from './App.vue';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

app
  .use(createPinia())
  .use(router)
  .mount('#app');

app.component('VueDatePicker', VueDatePicker);

app.directive('autofocus', {
  mounted(el) {
    el.focus();
  },
});
