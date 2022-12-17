import * as React from 'react';
import {useGetLabelQuery, useEditLabelMutation} from "../../../../services/rtk/label";
import Label from "../../../../model/Label";
import {useRouter} from "next/router";
import {Grid} from "@mui/material";
import PageHeader from "../../../../layouts/PageHeader";
import {skipToken} from "@reduxjs/toolkit/query";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import {setSnackbar} from "../../../../store/loaderSlice";
import {useDispatch} from "react-redux";
import FormInput from "../../../../components/forms/FormInput";
import FormCheckbox from "../../../../components/forms/FormCheckbox";

export default function LabelEdit() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [editLabel, { isLoading }] = useEditLabelMutation()

    const [item, setItem] = useState({
        name: '',
        isActive: false,
    });
    const [violations, setViolations] = useState([]);

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
        setViolations([])

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
                        <FormInput
                            violations={violations}
                            property="name"
                            value={item.name}
                            label="Name"
                            onChange={handleChange}
                        ></FormInput>
                    </Grid>
                    <Grid item xs={12}>
                        <FormCheckbox
                            violations={violations}
                            property="isActive"
                            label="Is active"
                            value={item.isActive}
                            onChange={handleChange}
                        ></FormCheckbox>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">Save</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}
