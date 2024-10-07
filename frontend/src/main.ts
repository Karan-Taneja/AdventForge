import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeMockApi } from './shared/mocks/api';

import './main.css';

const app = createApp(App);

initializeMockApi()
  .then(() => {
    console.log('Mock API initialized');
    app.use(router).mount('#app');
  })
  .catch(error => {
    console.error('Failed to initialize mock API:', error);
    app.use(router).mount('#app');
  });
