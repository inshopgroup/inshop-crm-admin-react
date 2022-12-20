import * as React from 'react';
import {useGetItemQuery} from "../../../../store/crud";
import Label, {headCells} from "../../../../model/Label";
import {useRouter} from "next/router";
import {skipToken} from "@reduxjs/toolkit/query";
import PageHeader from "../../../../layouts/PageHeader";
import BaseShow from "../../../../components/BaseShow";

export default function LabelShow() {
    const router = useRouter()
    const { id } = router.query

    const { data }: { data?: Label | undefined; } = useGetItemQuery(
        id ? { id: parseInt(id.toString()), '@type': 'Label' } : skipToken
    )

    return (
        data &&
        <>
            <PageHeader title={data.name}></PageHeader>
            <BaseShow headCells={headCells} item={data}></BaseShow>
        </>
    );
}
