import * as React from 'react';
import BaseTable from "../../../components/BaseTable";
import {useGetLabelsQuery, useDeleteLabelMutation} from "../../../services/rtk/label";
import {headCells} from "../../../model/Label";
import PageHeader from "../../../layouts/PageHeader";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import {useRouter} from "next/router";

export default function LabelIndex() {
    const [deleteLabel] = useDeleteLabelMutation()
    const router = useRouter();

    const actions = () => {
        return (
            <>
                <Tooltip title="Create new">
                    <IconButton onClick={() => router.push('/dashboard/label/create')}>
                        <AddCircleIcon sx={{color: 'green'}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </>
        )
    }

    return (
        <>
            <PageHeader
                title="Labels"
                actions={actions}
            ></PageHeader>

            <BaseTable
                route="label"
                headCells={headCells}
                loadHandler={useGetLabelsQuery}
                deleteAction={deleteLabel}
            ></BaseTable>
        </>
    );
}