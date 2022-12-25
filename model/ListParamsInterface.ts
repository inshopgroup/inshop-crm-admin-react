import {allowedModels} from "./ModelInterface";

const allowedModelsKeys = Object.keys(allowedModels)

export interface ListParamsInterface {
    '@type': typeof allowedModelsKeys[number];
}
