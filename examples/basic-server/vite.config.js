import {defineConfig} from 'vite';
import {NestApiPlugin} from '@reduite/zeroapi-nest';
import dts from 'vite-plugin-dts';
import {externalizeDeps} from 'vite-plugin-externalize-deps';

export default defineConfig({
    build : {
        rollupOptions : {
            external : ['@reduite/zeroapi-rpc'],
        },
    },
    plugins : [
        dts({include : 'src/api/**/*', outputDir : '.'}),
        NestApiPlugin.vite({apiRoot : 'src/api', outDir : 'api'}),
        externalizeDeps(),
    ],
});
