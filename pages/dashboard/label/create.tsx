import * as React from 'react';
import {useAddLabelMutation} from "../../../services/rtk/label";
import Label from "../../../model/Label";
import PageHeader from "../../../layouts/PageHeader";
import {useState} from "react";
import {useDispatch} from "react-redux";
import BaseForm from "../../../components/BaseForm";
import {proceedResponse} from "../../../components/forms/FormHelper";
import {useRouter} from "next/router";
import {headCells} from "../../../model/Label";

export default function LabelEdit() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [addLabel] = useAddLabelMutation()

    const [item, setItem] = useState(new Label());
    const [violations, setViolations] = useState([]);

    const onChange = (e: any) => {
        setItem({
            ...item,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        setViolations([])

        addLabel(item)
            .then(response => proceedResponse(response, setViolations, dispatch))
            .then(response => {
                router.push(`/dashboard/label/show/${response.data.id}`)
            })
    }

    return (
        <>
            <PageHeader title="Add new label"></PageHeader>

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
