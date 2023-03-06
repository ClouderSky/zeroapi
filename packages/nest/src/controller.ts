

import {z} from 'zod';
import {ModuleRef} from '@nestjs/core';
import {
    Body, Controller, Param, Post, Query, Req, SetMetadata,
} from '@nestjs/common';
import {createZodDto} from '@anatine/zod-nestjs';
import {API_METADATA_TYPE, ApiMetadataType} from './constant';
import {RequestCommon, RequestContext} from './context';


interface ControllerOption<
    Args extends z.ZodTypeAny,
    Param extends z.ZodObject<any>,
    Query extends z.ZodObject<any>,
> {
    route ?: string | string[];
    args ?: Args;
    param ?: Param;
    query ?: Query;
}

type SchemaArgs<Args extends z.ZodTypeAny> =
    Args extends z.ZodTuple ? z.infer<Args> :
        z.ZodTypeAny extends Args ? [] : [z.infer<Args>];

type ControllerFunction<Args extends any[], R> =
    (context : RequestContext) => (...args : Args) => R | Promise<R>;


const makeUrl = (
    prefix ?: string | string[], route ?: string | string[],
) : string => [
    '', prefix && (Array.isArray(prefix) ? prefix[0] : prefix),
    route && (Array.isArray(route) ? route[0] : route),
].filter((x) : x is string => typeof x === 'string').join('/');

const createBodyDTO = (option ?: ControllerOption<z.ZodTypeAny, any, any>) =>
    createZodDto(z.object({args : option?.args || z.array(z.any())}));


export interface OutputController<A extends any[], R> {
    url : string;
    (...args : A) : Promise<R>;
    new (...args : any[]) : any;
}

export const createController = (prefix ?: string | string[]) => <
    Args extends z.ZodTypeAny,
    Param extends z.ZodObject<any>,
    Query extends z.ZodObject<any>,
    A extends SchemaArgs<Args>,
    R,
>(
    func : ControllerFunction<A, R>,
    option ?: ControllerOption<Args, Param, Query>,
) => {
    class BodyDTO extends createBodyDTO(option) {}

    @Controller({path : prefix})
    @SetMetadata(API_METADATA_TYPE, ApiMetadataType.CONTROLLER)
    class FunctionController {
        constructor(private ref : ModuleRef) {}

        public static url = makeUrl(prefix, option?.route);

        @Post(option?.route)
        async server(
        @Req() raw : any, @Body() body : BodyDTO,
            @Param() param : Record<string, string>,
            @Query() query : Record<string, string>,
        ) {
            const req = new RequestCommon(raw, param, query);
            const context = new RequestContext(this.ref, req);
            return func(context)(...(body.args || []));
        }
    }

    return FunctionController as unknown as OutputController<A, R>;
};
