import type {SetupOption} from './client';
import {fetcher} from './client';

const setupOption : SetupOption = {fetcher};

export const setupHttpClient = (option : SetupOption = {}) =>
    Object.assign(setupOption, option);

export const getOption = () => setupOption;
