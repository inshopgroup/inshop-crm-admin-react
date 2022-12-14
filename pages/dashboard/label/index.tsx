import * as React from 'react';
import ApiTable, {HeadCell} from "../../../components/ApiTable";
import {useGetItemsQuery} from "../../../services/rtk/label";

const headCells: readonly HeadCell[] = [
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

export default function LabelIndex() {
    return (
        <ApiTable
            title="Labels"
            route="labels"
            headCells={headCells}
            loadHandler={useGetItemsQuery}
        ></ApiTable>
    );
}
