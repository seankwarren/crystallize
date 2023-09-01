import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@utils': path.resolve(__dirname, './src/utils'),
            '@stores': path.resolve(__dirname, './src/stores'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
    plugins: [react()],
});
