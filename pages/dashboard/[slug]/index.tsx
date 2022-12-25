import * as React from 'react';
import BaseTable, {HeadCell} from "../../../components/BaseTable";
import {useGetItemsQuery, useDeleteItemMutation} from "../../../store/crud";
import PageHeader from "../../../layouts/PageHeader";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterListIcon from "@mui/icons-material/FilterList";
import {useRouter} from "next/router";
import {useState} from "react";
import {geModelByRoute} from "../../../model/ModelInterface";

export default function CrudIndex() {
    const router = useRouter()
    const { slug } = router.query

    const [deleteItem] = useDeleteItemMutation()
    const [headCells, setHeadCells] = useState<readonly HeadCell[] | null>(null);

    let model: string | null = null;

    if (slug) {
        model = geModelByRoute(slug.toString())

        import(`../../../model/${model}`).then((modelImported) => {
            setHeadCells(modelImported.headCells)
        });
    }

    const actions = () => {
        return (
            <>
                <Tooltip title="Create new">
                    <IconButton onClick={() => router.push(`/dashboard/${slug}/create`)}>
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
            {model && headCells &&
                <>
                    <PageHeader
                        title={model}
                        actions={actions}
                    ></PageHeader>
                    <BaseTable
                        model={model}
                        headCells={headCells}
                        loadHandler={useGetItemsQuery}
                        deleteAction={deleteItem}
                    ></BaseTable>
                </>
            }
        </>
    );
}
