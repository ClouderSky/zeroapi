import type {Fetcher} from './interface';

export const fetcher : Fetcher = (req, opiton) => {
    const url = [opiton.baseUrl || '', req.url || '']
        .join('/').replace(/(?<!:)\/+/g, '/');

    return fetch(url, {
        method : 'POST',
        body : req.data ? JSON.stringify(req.data) : undefined,
        credentials : opiton.withCredentials ? 'include' : 'omit',
    }).then((x) => x.json());
};
