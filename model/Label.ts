import {HeadCell} from "../components/ApiTable";

export default class Label {
    id: number | undefined = undefined;
    name: string = '';
    isActive: boolean = false;
    createdAt: string | undefined = undefined;
    updatedAt: string | undefined = undefined;
}

export const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        label: 'ID',
        visibleInList: true,
        visibleInShow: true,
        visibleInEdit: true,
    },
    {
        id: 'name',
        label: 'Name',
        visibleInList: true,
        visibleInShow: true,
        visibleInEdit: true,
    },
    {
        id: 'isActive',
        label: 'Is active',
        visibleInList: true,
        visibleInShow: true,
        visibleInEdit: true,
    },
    {
        id: 'createdAt',
        label: 'Created at',
        visibleInList: true,
        visibleInShow: true,
        visibleInEdit: false,
    },
    {
        id: 'updatedAt',
        label: 'Updated at',
        visibleInList: false,
        visibleInShow: true,
        visibleInEdit: false,
    },
];
