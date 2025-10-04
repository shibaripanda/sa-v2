// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Получаем __dirname в ES-модуле
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Загружаем конкретный env-файл
dotenv.config({ path: path.resolve(__dirname, '../envs/.env.client-user-dev') });

export default defineConfig({
  // теперь переменные из файла доступны
  // в клиентском коде нужны с VITE_*
  server: {
    allowedHosts: [
      '543f10c370ee.ngrok-free.app', // 👈 твой ngrok-хост
    ],
  },
});
