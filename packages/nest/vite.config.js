import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';
import {externalizeDeps} from 'vite-plugin-externalize-deps';


export default defineConfig({
    build : {
        lib : {
            entry : 'src/index.ts',
            formats : ['cjs'],
            fileName : 'index',
        },
    },
    plugins : [
        dts(),
        externalizeDeps(),
    ],
});
