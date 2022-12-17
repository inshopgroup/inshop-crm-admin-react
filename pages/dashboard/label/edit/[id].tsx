import * as React from 'react';
import {useGetLabelQuery, useEditLabelMutation} from "../../../../services/rtk/label";
import Label from "../../../../model/Label";
import {useRouter} from "next/router";
import PageHeader from "../../../../layouts/PageHeader";
import {skipToken} from "@reduxjs/toolkit/query";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import LabelForm from "../../../../components/LabelForm";
import {proceedResponse} from "../../../../components/forms/FormHelper";

export default function LabelEdit() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [editLabel, { isLoading }] = useEditLabelMutation()

    const [item, setItem] = useState(new Label());
    const [violations, setViolations] = useState([]);

    const { id } = router.query
    const { data }: { data?: Label } = useGetLabelQuery(id ? parseInt(id.toString()) : skipToken)

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

            <LabelForm
                onSubmit={onSubmit}
                violations={violations}
                item={item}
                onChange={onChange}
            ></LabelForm>
        </>
    );
}
