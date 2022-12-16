import * as React from 'react';
import MainLayout from '../src/components/MainLayout'
import Container from '@mui/material/Container';
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import ModalWindow from '../src/components/ModalWindow'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


function Dashboard() {
    const [products, setProducts] = useState<[]>([])
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

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
    function getEmptyObj() {
        return {
            id: Date.now(),
            name: '',
            prop2: '',
            prop3: ''
        };
    }
    function change(prop, event) { // изменение свойства при вводе
        setProduct({...product, id: Date.now(), [prop]: event.target.value});
    }
    function add() {
        setProducts([...products, product]);  // добавление объекта к массиву
        setProduct(getEmptyObj()); // сохранение пустого объекта в стейт
        setOpen(!open)
    }
    useEffect(() => {
        fetchProducts()

    },[])
    return(
        <MainLayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Button onClick={handleOpen}>Add Product</Button>
                <ModalWindow open={open} handleOpen={handleOpen} item={product} change={change} add={add} item={
                }
                >
                </ModalWindow>
                <div style={{ height: 600, width: '100%' }}>
                    { loading && <Typography variant="h6" align="center">Loading...</Typography> }
                    <DataGrid rows={products} columns={columns} checkboxSelection />
                </div>
            </Container>
        </MainLayout>
    )
}

export default Dashboard