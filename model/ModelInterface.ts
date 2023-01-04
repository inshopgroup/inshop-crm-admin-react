import pluralize from 'pluralize'
import {snakeCase, pascalCase} from 'change-case'
import Label from "./Label";

export const allowedModels = {
    Label,
};

const allowedModelsKeys = Object.keys(allowedModels)

export const getRouteByModel = (model: typeof allowedModelsKeys[number]): string => {
    return pluralize(snakeCase(model))
}

export const geModelByRoute = (route: string): typeof allowedModelsKeys[number] => {
    return pluralize.singular(pascalCase(route))
}

export interface ModelInterface {
    id: number | undefined;
    '@type': typeof allowedModelsKeys[number];
}
