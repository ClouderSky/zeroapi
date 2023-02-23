import {describe, expect, test} from '@jest/globals';
import {z} from 'zod';
import {createController} from '../controller';
import {transform} from './transform';


const controller = createController('test');

const _hello = (name : string) => `hello,${name}`;

export const hello = controller(
    _hello, {route : 'hello', args : z.tuple([z.string()])});

export default hello;


const compiled = [
    'import {request} from "@reduite/zeroapi-rpc";',
    'export const hello = (...args) => request({url : \'/test/hello\', args});',
    'export default (...args) => request({url : \'/test/hello\', args});',
].join('\n');

describe('compile api controller', () => {
    test('compile this', () => {
        expect(transform(__filename)).toEqual(compiled);
    });
});
