import { useEffect, useState } from 'react';
import {useGetItemQuery, useEditItemMutation} from "../../../../store/crud";
import {useRouter} from "next/router";
import PageHeader from "../../../../layouts/PageHeader";
import {skipToken} from "@reduxjs/toolkit/query";
import {useDispatch} from "react-redux";
import BaseForm from "../../../../components/BaseForm";
import {proceedResponse} from "../../../../components/forms/FormHelper";
import {HeadCell} from "../../../../components/BaseTable";
import {geModelByRoute, ModelInterface} from "../../../../model/ModelInterface";

export default function ItemEdit() {
    const router = useRouter()
    const { slug, id } = router.query

    const dispatch = useDispatch()
    const [editItem, { isLoading }] = useEditItemMutation()

    const [headCells, setHeadCells] = useState<readonly HeadCell[] | null>(null);
    const [item, setItem] = useState();
    const [model, setModel] = useState<string | null>(null);
    const [violations, setViolations] = useState([]);
    const [title, setTitle] = useState<string>('');

    const { data }: { data?: ModelInterface | undefined; } = useGetItemQuery(
        id && model ? { id: parseInt(id.toString()), '@type': model } : skipToken
    )

    useEffect(() => {
      if (data) {
        setTitle(data.name)
        setItem(data)
      }
    }, [data])

    if (slug && headCells === null) {
      try {
        const _model = geModelByRoute(slug.toString())
        const modelImported = require(`../../../../model/${_model}`)

        setHeadCells(modelImported.headCells)
        setModel(_model)
      } catch (e) {
        return `Something went wrong ${e}`
      }
    }

    const onChange = (e: any) => {
        setItem({
            ...item,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        setViolations([])

        editItem(item)
            .then(response => proceedResponse(response, setViolations, dispatch))
            .then(response => {
                router.push(`/dashboard/${slug}/show/${response.data.id}`)
            })
    }

    return (
        item && headCells &&
        <>
            <PageHeader title={title}></PageHeader>

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
