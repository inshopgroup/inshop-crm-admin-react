import * as React from 'react';
import ApiTable from "../../../components/ApiTable";
import {useGetItemsQuery} from "../../../services/rtk/label";
import {headCells} from "../../../model/Label";

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
