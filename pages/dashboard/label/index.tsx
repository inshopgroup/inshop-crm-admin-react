import * as React from 'react';
import ApiTable from "../../../components/ApiTable";
import {useGetLabelsQuery} from "../../../services/rtk/label";
import {headCells} from "../../../model/Label";
import PageHeader from "../../../layouts/PageHeader";

export default function LabelIndex() {
    return (
        <>
            {<PageHeader title="Labels"></PageHeader>}
            <ApiTable
                route="labels"
                headCells={headCells}
                loadHandler={useGetLabelsQuery}
            ></ApiTable>
        </>
    );
}
