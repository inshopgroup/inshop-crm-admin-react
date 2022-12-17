import * as React from 'react';
import {useGetLabelQuery, useEditLabelMutation} from "../../../../services/rtk/label";
import Label, {headCells} from "../../../../model/Label";
import {useRouter} from "next/router";
import {
    Checkbox,
    FormControlLabel,
    Grid,
} from "@mui/material";
import PageHeader from "../../../../layouts/PageHeader";
import {skipToken} from "@reduxjs/toolkit/query";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {setSnackbar} from "../../../../store/loaderSlice";
import {useDispatch} from "react-redux";

export default function LabelEdit() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [editLabel, { isLoading }] = useEditLabelMutation()

    const [item, setItem] = useState({
        name: '',
        isActive: false,
    });
    const [violations, setViolations] = useState({});

    const { id } = router.query
    const { data }: { data?: Label } = useGetLabelQuery(id ? parseInt(id.toString()) : skipToken)

    useEffect(() => {
        if (data) {
            setItem({ ...data })
        }
    }, [data])

    const handleChange = (e: any) => {
        setItem({
            ...item,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        editLabel(item).then(response => {
            if (response.error) {
                setViolations(response.error.data.violations)
            } else {
                dispatch(setSnackbar({
                    message: 'Successfully saved',
                    severity: 'success',
                }))
            }
        })
    }

    return (
        data &&
        <>
            <PageHeader title={data.name}></PageHeader>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth name="name" label="Name" value={item.name} onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            label="Is Active"
                            control={
                                <Checkbox
                                    name="isActive"
                                    checked={item.isActive}
                                    onChange={handleChange}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">Save</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
