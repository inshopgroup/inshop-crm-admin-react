import { getTableCellData } from '../utils'

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {HeadCell} from "./BaseTable";

export interface BaseShowProps {
    headCells: readonly HeadCell[];
    item: any;
}

export default function BaseShow(props: BaseShowProps) {
  const { item, headCells } = props

  let content = null

  if (!!item) {
    content = headCells.map((headCell) => (
        <TableRow
            key={headCell.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          {headCell.visibleInShow && <>
            <TableCell component="th" scope="row" sx={{width: '50%'}}>
              {headCell.label}
            </TableCell>
            <TableCell sx={{width: '50%'}}>
              {getTableCellData(item[headCell.id], headCell.id)}
            </TableCell>
          </>}
        </TableRow>
    ))
  }

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
                    {content}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
