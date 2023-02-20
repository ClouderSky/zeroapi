

import type {
    MiddlewareConsumer, ModuleMetadata as Metadata, NestModule,
} from '@nestjs/common';
import {Module} from '@nestjs/common';


export interface ModuleMetadata extends Metadata {
    configure ?: (consumer : MiddlewareConsumer) => void;
}

export type ModuleClass = new () => any;

export const createModule = (metadata : ModuleMetadata) => {
    const {configure, ...other} = metadata;

    @Module(other)
    class FunctionModule implements NestModule {
        configure(consumer : MiddlewareConsumer) {
            configure && configure(consumer);
        }
    }

    return FunctionModule as ModuleClass;
};
