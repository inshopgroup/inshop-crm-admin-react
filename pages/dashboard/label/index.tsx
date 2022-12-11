import * as React from 'react';
import ApiTable, {HeadCell} from "../../../components/ApiTable";
import Label from '../../../model/Label'
import axios from "../../../src/axios";
import {useState} from "react";

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

// function createData(
//     id: number,
//     name: string,
//     isActive: boolean,
//     createdAt: string,
//     updatedAt: string
// ): any {
//     return {
//         id,
//         name,
//         isActive,
//         createdAt,
//         updatedAt,
//     };
// }

// const rows = [
//     createData(1, 'Cupcake', true, '3.7', '67, 4.3'),
//     createData(2, 'Cupcake', true, '3.7', '67, 4.3'),
//     createData(3, 'Cupcake', false, '3.7', '67, 4.3'),
//     createData(4, 'Cupcake', true, '3.7', '67, 4.3'),
//     createData(5, 'Cupcake', true, '3.7', '67, 4.3'),
//     createData(6, 'Cupcake', false, '3.7', '67, 4.3'),
//     createData(7, 'Cupcake', true, '3.7', '67, 4.3'),
//     createData(8, 'Cupcake', true, '3.7', '67, 4.3'),
//     createData(9, 'Cupcake', true, '3.7', '67, 4.3'),
// ];

export default function LabelIndex() {
    // const [rows, setRows] = useState([])
    // const [total, setTotal] = useState(0)
    //
    // console.log('useEffect')
    // axios.get('http://localhost:8888/labels')
    //     .then(response => response.data)
    //     .then(data => {
    //         // const rows: Label[] = data['hydra:member']
    //         // const totalItems: Number = data['hydra:totalItems']
    //
    //         setRows(data['hydra:member'])
    //         setTotal(data['hydra:totalItems'])
    //
    //         // console.log(data, rows, totalItems)
    //     })

    return (
        <>
            <ApiTable
                title="Labels"
                route="labels"
                headCells={headCells}
                // rows={rows}
                // total={total}
            ></ApiTable>
        </>
    );
}
