import * as React from 'react';
import {useAddItemMutation} from "../../../store/crud";
import PageHeader from "../../../layouts/PageHeader";
import {useState} from "react";
import {useDispatch} from "react-redux";
import BaseForm from "../../../components/BaseForm";
import {proceedResponse} from "../../../components/forms/FormHelper";
import {useRouter} from "next/router";
import {HeadCell} from "../../../components/BaseTable";
import {geModelByRoute, ModelInterface} from "../../../model/ModelInterface";

export default function ItemEdit() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { slug } = router.query

    const [addItem] = useAddItemMutation()

    const [item, setItem] = useState<ModelInterface | null>(null);
    const [violations, setViolations] = useState([]);
    const [headCells, setHeadCells] = useState<readonly HeadCell[] | null>(null);

    if (slug && headCells === null) {
      try {
        const _model = geModelByRoute(slug.toString())
        const modelImported = require(`../../../model/${_model}`)

        setItem(new modelImported.default)
        setHeadCells(modelImported.headCells)
      } catch (e) {
        return `Something went wrong ${e}`
      }
    }

    const onChange = (e: any) => {
        if (item) {
            setItem({
                ...item,
                [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
            });
        }
    }

    const onSubmit = (e: any) => {
        if (item) {
            e.preventDefault()
            setViolations([])

            addItem(item)
                .then(response => proceedResponse(response, setViolations, dispatch))
                .then(response => {
                    router.push(`/dashboard/${slug}/show/${response.data.id}`)
                })
        }
    }

    return (
        <>
            {item && headCells &&
                <>
                    <PageHeader title={`Add new ${item['@type']}`}></PageHeader>

                    <BaseForm
                        headCells={headCells}
                        onSubmit={onSubmit}
                        violations={violations}
                        item={item}
                        onChange={onChange}
                    ></BaseForm>
                </>
            }
        </>
    );
}
