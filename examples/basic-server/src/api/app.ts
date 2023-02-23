import * as E from 'fp-ts/Either';
import type {RequestContext} from '@zeroapi/nest';
import {createController, createModule} from '@zeroapi/nest';
import {AppService} from '../service/app';


const controller = createController();

function _hello(this : RequestContext) {
    const service = this.ref.get(AppService);
    const result = service.getHello();
    return E.right(result);
}

export const hello = controller(_hello);

export default createModule({
    controllers : [hello],
    providers : [AppService],
});
