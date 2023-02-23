import {describe, expect, test, jest} from '@jest/globals';
import {setupHttpClient} from './setup';
import {request} from './request';


describe('rpc request', () => {
    const mockResult = 'mock result';
    const fetcher = jest.fn(async () => mockResult);

    test('request basic', async () => {
        setupHttpClient({fetcher});
        expect(await request({url : '/test', args : []})).toBe(mockResult);
    });
});
