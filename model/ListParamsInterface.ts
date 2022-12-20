import {allowedModels} from "./ModelInterface";

export interface ListParamsInterface {
    '@type': typeof allowedModels[number];
}
