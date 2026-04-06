import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => {
  const isLib = command === 'build';

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(isLib
        ? [
            dts({
              tsconfigPath: './tsconfig.build.json',
              outDir: 'dist',
              include: ['src/**/*.ts', 'src/**/*.tsx'],
              rollupTypes: true,
              insertTypesEntry: true,
            }),
          ]
        : []),
    ],

    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'CrispUI',
        formats: ['es', 'cjs'],
        fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime',
          },
          assetFileNames: () => 'crisp.css',
        },
      },
      sourcemap: true,
      emptyOutDir: true,
    },

    // Dev server entry uses demo/
    resolve: {
      alias: {
        '@crispui/react': resolve(__dirname, 'src/index.ts'),
      },
    },
  };
});
