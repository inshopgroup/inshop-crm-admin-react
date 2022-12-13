import * as React from 'react';
import MainLayout from '../src/components/MainLayout'
import Container from '@mui/material/Container';
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";


function Dashboard() {
    const [products, setProducts] = useState<[]>([])
    const [loading, setLoading] = useState(false)

    const columns = [
        { field: 'id', headerName: 'id', width: 100},
        { field: 'title', headerName: 'title', width: 300},
        { field: 'category', headerName: 'category',width: 150},
        { field: 'price', headerName: 'price', width: 150},
        { field: 'description', headerName: 'description', width: 350},

    ];
    function fetchProducts() {
        setLoading(true)
        axios.get<[]>('https://fakestoreapi.com/products').then(r => setProducts(r.data))
        setLoading(false)
    }
    useEffect(() => {
        fetchProducts()

    },[])
    return(
        <MainLayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <div style={{ height: 600, width: '100%' }}>
                    { loading && <Typography variant="h6" align="center">Loading...</Typography> }
                    <DataGrid rows={products} columns={columns} checkboxSelection />
                </div>
            </Container>
        </MainLayout>
    )
}

export default Dashboard