import { defineConfig } from 'astro/config';
import path from 'path';

// https://astro.build/config
export default defineConfig({
    
    vite: {
    resolve: {
        alias: {
            // Mapea el alias @/ a la carpeta /src
            '@/': path.resolve(process.cwd(), 'src/'),
        }
    }
}
});