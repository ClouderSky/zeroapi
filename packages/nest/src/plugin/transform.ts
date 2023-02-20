

import {API_METADATA_TYPE, ApiMetadataType} from '../constant';
import {OutputController} from '../controller';


const requireModule = (id : string) => {
    delete require.cache[require.resolve(id)];
    return require(id);
};

const toClientFunction = (name : string, value : any) => {
    if (typeof value !== 'function') { return; }

    const apiType = Reflect.getMetadata(API_METADATA_TYPE, value);
    if (apiType !== ApiMetadataType.CONTROLLER) { return; }

    const api : OutputController<any[], any> = value;

    const head = name === 'default' ?
        'export default' : `export const ${name} =`;
    return `${head} (...args) => request({url : '${api.url}', args});`;
};

export const transform = (id : string) => {
    const mod = requireModule(id);
    const apiList = Object.entries(mod)
        .map(([name, value]) => toClientFunction(name, value))
        .filter((x) : x is string => !!x);
    return apiList.length === 0 ?
        '' : ['import {request} from "@zeroapi/rpc";', ...apiList].join('\n');
};
