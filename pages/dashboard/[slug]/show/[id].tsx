import * as React from 'react';
import {useGetItemQuery} from "../../../../store/crud";
import {useRouter} from "next/router";
import {skipToken} from "@reduxjs/toolkit/query";
import PageHeader from "../../../../layouts/PageHeader";
import BaseShow from "../../../../components/BaseShow";
import {geModelByRoute, ModelInterface} from "../../../../model/ModelInterface";
import {useState} from "react";
import {HeadCell} from "../../../../components/BaseTable";

export default function ItemShow() {
    const router = useRouter()
    const { slug, id } = router.query

    const [headCells, setHeadCells] = useState<readonly HeadCell[] | null>(null);
    const [model, setModel] = useState<string | null>(null);

    if (slug && headCells === null) {
        const _model = geModelByRoute(slug.toString())

        import(`../../../../model/${_model}`).then((modelImported) => {
            setHeadCells(modelImported.headCells)
            setModel(_model)
        });
    }

    const { data }: { data?: ModelInterface | undefined; } = useGetItemQuery(
        id ? { id: parseInt(id.toString()), '@type': model } : skipToken
    )

    return (
        data && headCells &&
        <>
            <PageHeader title={data.name}></PageHeader>
            <BaseShow headCells={headCells} item={data}></BaseShow>
        </>
    );
}
