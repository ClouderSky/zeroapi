import {getOption} from './setup';

export interface RequestObject<A extends any[]> {
    url : string;
    args : A;
}

export const request = <A extends any[], B>(input : RequestObject<A>) => {
    const option = getOption();
    const fetcher = option.fetcher;
    if (!fetcher) {
        throw new Error('fetcher not found, use `setupHttpClient` first');
    }

    const {url, args} = input;
    return fetcher({url, data : {args}}, option) as Promise<B>;
};
