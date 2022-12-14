import * as React from 'react';
import {useGetItemQuery} from "../../../../services/rtk/label";
import {headCells} from "../../../../model/Label";
import {useRouter} from "next/router";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function LabelShow() {
    const router = useRouter()
    const { id } = router.query

    const {data, error, isLoading} = useGetItemQuery(parseInt(id))

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: '50%'}}>Property</TableCell>
                        <TableCell sx={{width: '50%'}}>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && headCells.map((headCell) => (
                        <TableRow
                            key={headCell.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" sx={{width: '50%'}}>
                                {headCell.label}
                            </TableCell>
                            <TableCell sx={{width: '50%'}}>{data[headCell.id]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
