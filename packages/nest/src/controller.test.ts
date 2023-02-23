

import {z} from 'zod';
import {describe, test, expect, beforeAll} from '@jest/globals';
import type {NestFastifyApplication} from '@nestjs/platform-fastify';
import {FastifyAdapter} from '@nestjs/platform-fastify';
import {Test} from '@nestjs/testing';
import {createController} from './controller';


describe('hello name controller', () => {
    const controller = createController('test');

    const helloName = (name : string) => `hello,${name}!`;
    const HelloNameController =
        controller(helloName, {route : 'hello', args : z.tuple([z.string()])});

    let app : NestFastifyApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers : [HelloNameController],
        }).compile();

        app = moduleRef.createNestApplication<NestFastifyApplication>
        (new FastifyAdapter());
        await app.init();
        /* eslint-disable-next-line */
        await app.getHttpAdapter().getInstance().ready();
    });

    test('client url', () => {
        expect(HelloNameController.url).toEqual('/test/hello');
    });

    test('hello name response', () => app
        .inject({
            method : 'POST', path : '/test/hello', payload : {args : ['world']},
        })
        .then(res => {
            expect(res.statusCode).toBe(201);
            expect(res.body).toEqual('hello,world!');
        }));
});
