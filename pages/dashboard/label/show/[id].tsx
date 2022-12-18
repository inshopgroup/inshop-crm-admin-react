import * as React from 'react';
import {useGetLabelQuery} from "../../../../services/rtk/label";
import Label, {headCells} from "../../../../model/Label";
import {useRouter} from "next/router";
import {skipToken} from "@reduxjs/toolkit/query";
import PageHeader from "../../../../layouts/PageHeader";
import BaseShow from "../../../../components/BaseShow";

export default function LabelShow() {
    const router = useRouter()
    const { id } = router.query
    const { data }: { data?: Label | undefined; } = useGetLabelQuery(id ? parseInt(id.toString()) : skipToken)

    return (
        data &&
        <>
            <PageHeader title={data.name}></PageHeader>
            <BaseShow headCells={headCells} item={data}></BaseShow>
        </>
    );
}
