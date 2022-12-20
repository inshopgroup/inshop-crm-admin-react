import * as React from 'react';
import MainLayout from '../src/components/MainLayout'
import Container from '@mui/material/Container';
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import {useEffect, useState} from "react";
import {Grid, Input, TextField, Typography} from "@mui/material";
import ModalWindow from '../src/components/ModalWindow'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";


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
            title: '',
            category: '',
            price: '',
            description: ''
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
                    <Button sx={{ mb: 2 }} variant="outlined" onClick={handleOpen}>Add Product</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleOpen}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Box className='modal'>
                            <form>
                                <Box sx={{ display:'flex', justifyContent: 'space-between', mb: 3 }}>
                                        <TextField id="standard-basic" label="Title" variant="standard"  value={product.title} onChange={event => change('title', event)} />
                                        <TextField id="standard-basic" label="Category" variant="standard" value={product.category} onChange={event => change('category', event)} />
                                        <TextField id="standard-basic" label="Price" variant="standard" value={product.price} onChange={event => change('price', event)} />
                                        <TextField id="standard-basic" label="Description"  variant="standard" value={product.description} onChange={event => change('description', event)} />
                                </Box>
                                <div className='button'>
                                    <Button variant="outlined" onClick={add}>Add Product</Button>
                                </div>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
                <div style={{ height: 600, width: '100%' }}>
                    { loading && <Typography variant="h6" align="center">Loading...</Typography> }
                    <DataGrid rows={products} columns={columns} checkboxSelection />
                </div>
            </Container>
        </MainLayout>
    )
}

export default Dashboard