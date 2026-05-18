import 'vuetify/styles';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#7c4dff',
          secondary: '#03dac6',
        },
      },
      light: {
        dark: false,
        colors: {
          primary: '#5e35b1',
          secondary: '#00695c',
        },
      },
    },
  },
});

createApp(App).use(vuetify).mount('#app');
