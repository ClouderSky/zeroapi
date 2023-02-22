import type {RequestContext} from '@zeroapi/nest';
import {createController, createModule} from '@zeroapi/nest';
import {AppService} from '../service/app';


const controller = createController();

function _hello(this : RequestContext) {
    const service = this.ref.get(AppService);
    return service.getHello();
}

export const hello = controller(_hello);

export default createModule({
    controllers : [hello],
    providers : [AppService],
});
