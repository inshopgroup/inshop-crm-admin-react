import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import Link from "next/link";
import {setSnackbar} from "../store/loaderSlice";
import {useDispatch} from "react-redux";
import {allowedModels, getRouteByModel} from "../model/ModelInterface";

type Order = 'asc' | 'desc';

export interface HeadCell {
    id: string;
    label: string;
    type: string
    visibleInList: boolean
    visibleInShow: boolean
    visibleInEdit: boolean
}

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headCells: readonly HeadCell[]
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler =
        (property: string) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {props.headCells.map((headCell) => (
                    headCell.visibleInList &&
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell sx={{maxWidth: 100}}>
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const allowedModelsKeys = Object.keys(allowedModels)

interface BaseTableProps {
    model: typeof allowedModelsKeys[number]
    headCells: readonly HeadCell[]
    loadHandler: any
    deleteAction: Function
}

export default function BaseTable(props: BaseTableProps) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<string>('id');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const dispatch = useDispatch();

    const { data, error, isLoading } = props.loadHandler({
        '@type': props.model,
        itemsPerPage: rowsPerPage,
        page: page + 1,
        ['order[' + orderBy + ']']: order,
    })

    const rows = data ? data['hydra:member'] : []
    const total = data ? data['hydra:totalItems'] : 0

    const handleDelete = (id: number) => {
        if (confirm('Are you sure?')) {
            const item = {
                id,
                '@type': props.model
            }

            props.deleteAction(item).then((response: any) => {
                if (!response.error) {
                    dispatch(setSnackbar({
                        message: 'Successfully deleted',
                        severity: 'success',
                    }))
                }
            })
        }
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const route = getRouteByModel(props.model)

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={total}
                            headCells={props.headCells}
                        />
                        <TableBody>
                            {rows.map((row: any) => {
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        {props.headCells.map((headCell, index) => {
                                            return (
                                                headCell.visibleInList &&
                                                <TableCell key={row.id + '_' + index}>{row[headCell.id].toString()}</TableCell>
                                            )
                                        })}
                                        <TableCell key={row.id + '_actions'} sx={{maxWidth: 100}}>
                                            <Tooltip title="Show item">
                                                <Link href={{
                                                    pathname: `/dashboard/${route}/show/[id]`,
                                                    query: { id: row.id }
                                                }}>
                                                    <IconButton>
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="Edit item">
                                                <Link href={{
                                                    pathname: `/dashboard/${route}/edit/[id]`,
                                                    query: { id: row.id }
                                                }}>
                                                    <IconButton>
                                                        <EditIcon />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="Delete item">
                                                <IconButton onClick={() => handleDelete(row.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[25, 50, 100]}
                    component="div"
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
