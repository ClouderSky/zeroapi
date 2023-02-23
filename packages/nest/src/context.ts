

import type {ModuleRef} from '@nestjs/core';


export class RequestCommon {
    constructor(
        private raw : any,
        private param : Record<string, string>,
        private query : Record<string, string>,
    ) {}

    getRequest = <A>() => this.raw as A;

    getParam = <A extends Record<string, string>>() : A => this.param as A;

    getQuery = <A extends Record<string, string>>() : A => this.query as A;
}

export class RequestContext {
    constructor(
        public ref : ModuleRef,
        public req : RequestCommon,
        public func : (...args : any[]) => any,
    ) {}
}
