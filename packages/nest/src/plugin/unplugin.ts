

import {createUnplugin} from 'unplugin';
import {register} from '@swc-node/register/register';
import pkg from '../../package.json';
import {listdir, makeEntry, makeOutput} from './path';
import {transform} from './transform';


export interface NestApiPluginOption {
    apiRoot ?: string;
    outDir ?: string;
}

export const NestApiPlugin =
    createUnplugin<NestApiPluginOption, false>(option => {
        register();

        const {apiRoot = 'src/api', outDir = 'api'} = option || {};

        return {
            name : pkg.name,
            enforce : 'pre',

            transform(code, id) {
                return transform(id);
            },

            vite : {
                config : async () => ({
                    build : {
                        outDir,
                        lib : {
                            entry : makeEntry(apiRoot)(await listdir(apiRoot)),
                            formats : ['cjs'],
                            fileName : (_, entry) => makeOutput(entry),
                        },
                    },
                }),
            },
        };
    });
