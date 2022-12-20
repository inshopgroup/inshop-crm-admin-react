import * as React from 'react';
import {useGetItemQuery, useEditItemMutation} from "../../../../store/crud";
import Label from "../../../../model/Label";
import {useRouter} from "next/router";
import PageHeader from "../../../../layouts/PageHeader";
import {skipToken} from "@reduxjs/toolkit/query";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import BaseForm from "../../../../components/BaseForm";
import {proceedResponse} from "../../../../components/forms/FormHelper";
import {headCells} from "../../../../model/Label";

export default function LabelEdit() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [editLabel, { isLoading }] = useEditItemMutation()

    const [item, setItem] = useState(new Label());
    const [violations, setViolations] = useState([]);

    const { id } = router.query

    const { data }: { data?: Label | undefined; } = useGetItemQuery(
        id ? { id: parseInt(id.toString()), '@type': 'Label' } : skipToken
    )

    useEffect(() => {
        if (data) {
            setItem({ ...data })
        }
    }, [data])

    const onChange = (e: any) => {
        setItem({
            ...item,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        setViolations([])

        editLabel(item).then(response => proceedResponse(response, setViolations, dispatch))
    }

    return (
        data &&
        <>
            <PageHeader title={data.name}></PageHeader>

            <BaseForm
                headCells={headCells}
                onSubmit={onSubmit}
                violations={violations}
                item={item}
                onChange={onChange}
            ></BaseForm>
        </>
    );
}
