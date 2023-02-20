export interface SetupOption {
    baseUrl ?: string;
    withCredentials ?: boolean;
    fetcher ?: Fetcher;
}

export interface HttpRequestOption {
    url : string;
    data ?: {
        args : any[];
    };
    query ?: Record<string, string>;
    headers ?: Record<string, string>;
}

export type Fetcher = (
    req : HttpRequestOption,
    option : SetupOption
) => Promise<any>;
