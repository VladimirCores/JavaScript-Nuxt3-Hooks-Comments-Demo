import { defineConfig } from 'windicss/helpers';
import icons from '@windicss/plugin-icons';

export default defineConfig({
  darkMode: 'class',
  preflight: true,
  plugins: [
    icons,
    require('daisyui'),
  ],
  extend: {
  },
  theme: {
    container: {
      center: true,
    },
  },
  daisyui: {
    prefix: '',
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    themes: [
      'cupcake',
      'pastel',
      'dark',
      'light',
    ],
  },
});
