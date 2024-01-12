// import { fileURLToPath, URL } from 'node:url'

// // import { defineConfig } from 'vite'
// import { defineConfig, loadEnv } from 'vite';
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), 'VITE_');
//   return {
//     plugins: [
//       vue(),
//     ],
//     define: {
//       API_URI: `${env.VITE_API_URI}`,
//     },
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url))
//       }
//     }
//   }
// })




import { fileURLToPath, URL } from 'url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [vue()],
    define: {
      CULQI_PUBLIC_KEY: `${env.VITE_CULQI_PUBLIC_KEY}`,
      API_URI: `${env.VITE_API_URI}`,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});





// import { fileURLToPath, URL } from 'url';

// import { defineConfig, loadEnv } from 'vite';
// import vue from '@vitejs/plugin-vue';

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), 'VITE_');
//   return {
//     plugins: [vue()],
//     define: {
//       CULQI_PUBLIC_KEY: `${env.VITE_CULQI_PUBLIC_KEY}`,
//       API_URI: `${env.VITE_API_URI}`,
//     },
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url)),
//       },
//     },
//   };
// });
