

import {z} from 'zod';
import {describe, test, expect, beforeAll} from '@jest/globals';
import {Injectable} from '@nestjs/common';
import type {NestFastifyApplication} from '@nestjs/platform-fastify';
import {FastifyAdapter} from '@nestjs/platform-fastify';
import {Test} from '@nestjs/testing';
import {RequestContext} from './context';
import {createController} from './controller';


@Injectable()
class HelloService {
    public getText = (name : string) => `hello,${name}!`;
}

describe('hello name controller', () => {
    const controller = createController('test');

    const helloName = ({ref} : RequestContext) => (name : string) => {
        const service = ref.get(HelloService);
        return service.getText(name);
    };
    const HelloNameController =
        controller(helloName, {route : 'hello', args : z.tuple([z.string()])});

    let app : NestFastifyApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers : [HelloNameController],
            providers : [HelloService],
        }).compile();

        const adapter = new FastifyAdapter();
        app = moduleRef.createNestApplication<NestFastifyApplication>(adapter);
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
