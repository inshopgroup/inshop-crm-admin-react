import {HeadCell} from "../components/BaseTable";
import {ModelInterface} from "./ModelInterface";

export default class Label implements ModelInterface{
    id: number | undefined = undefined;
    '@type': string = 'Label';
    name: string = '';
    isActive: boolean = true;
    createdAt: string | undefined = undefined;
    updatedAt: string | undefined = undefined;
}

export const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        label: 'ID',
        type: 'number',
        visibleInList: true,
        visibleInShow: true,
        visibleInEdit: false,
    },
    {
        id: 'name',
        label: 'Name',
        type: 'string',
        visibleInList: true,
        visibleInShow: true,
        visibleInEdit: true,
    },
    {
        id: 'isActive',
        label: 'Is active',
        type: 'boolean',
        visibleInList: true,
        visibleInShow: true,
        visibleInEdit: true,
    },
    {
        id: 'createdAt',
        label: 'Created at',
        type: 'datetime',
        visibleInList: true,
        visibleInShow: true,
        visibleInEdit: false,
    },
    {
        id: 'updatedAt',
        label: 'Updated at',
        type: 'datetime',
        visibleInList: false,
        visibleInShow: true,
        visibleInEdit: false,
    },
];
