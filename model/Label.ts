import {HeadCell} from "../components/ApiTable";

export default interface Label {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'name',
        label: 'Name',
    },
    {
        id: 'isActive',
        label: 'Is active',
    },
    {
        id: 'createdAt',
        label: 'Created at',
    },
    {
        id: 'updatedAt',
        label: 'Updated at',
    },
];
