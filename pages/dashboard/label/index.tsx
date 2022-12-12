import * as React from 'react';
import ApiTable, {HeadCell} from "../../../components/ApiTable";
import Label from '../../../model/Label'
import {useGetItemsQuery} from "../../../services/rtk/label";
import {selectLabelItems, selectLabelTotalItems, setErrorState, setItemsState} from "../../../store/labelSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

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
    const { data, error } = useGetItemsQuery({})
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setItemsState(data))
        dispatch(setErrorState(error))
    })

    const rows: Label[] = useSelector(selectLabelItems)
    const total: number = useSelector(selectLabelTotalItems)

    return (
        <>
            <ApiTable
                title="Labels"
                route="labels"
                headCells={headCells}
                rows={rows}
                total={total}
            ></ApiTable>
        </>
    );
}
