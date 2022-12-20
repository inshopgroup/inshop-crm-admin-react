import pluralize from 'pluralize'

export const allowedModels = [
    'Label',
];

export const getRouteByModel = (model: typeof allowedModels[number]) => {
    return pluralize(model.toLowerCase())
}

export interface ModelInterface {
    id: number | undefined;
    '@type': typeof allowedModels[number];
}
