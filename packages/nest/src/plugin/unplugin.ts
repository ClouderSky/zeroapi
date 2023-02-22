

import {relative, isAbsolute} from 'path';
import {createUnplugin} from 'unplugin';
import {register} from 'ts-node';
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
            name : '@zeroapi/nest',
            enforce : 'pre',

            transformInclude(id) {
                const path = relative(apiRoot, id);
                return !!path && !path.startsWith('..') && !isAbsolute(path);
            },

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
