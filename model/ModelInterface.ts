import pluralize from 'pluralize'
import {snakeCase, pascalCase} from 'change-case'

export const allowedModels = [
    'Label',
];

export const getRouteByModel = (model: typeof allowedModels[number]): string => {
    return pluralize(snakeCase(model))
}

export const geModelByRoute = (route: string): typeof allowedModels[number] => {
    return pluralize.singular(pascalCase(route))
}

export interface ModelInterface {
    id: number | undefined;
    '@type': typeof allowedModels[number];
}
