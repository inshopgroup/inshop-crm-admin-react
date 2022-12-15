import * as React from 'react';
import {useGetItemQuery} from "../../../../services/rtk/label";
import {headCells} from "../../../../model/Label";
import {useRouter} from "next/router";
import {FormControl, FormHelperText, Input, InputLabel} from "@mui/material";

export default function LabelShow() {
    const router = useRouter()
    const { id } = router.query

    // @ts-ignore
    const {data, error, isLoading} = useGetItemQuery(parseInt(id))

    return (
        <>
            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
        </>
    );
}
