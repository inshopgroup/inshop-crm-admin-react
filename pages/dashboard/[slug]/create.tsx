import * as React from 'react';
import {useAddItemMutation} from "../../../store/crud";
import PageHeader from "../../../layouts/PageHeader";
import {useState} from "react";
import {useDispatch} from "react-redux";
import BaseForm from "../../../components/BaseForm";
import {proceedResponse} from "../../../components/forms/FormHelper";
import {useRouter} from "next/router";
import {HeadCell} from "../../../components/BaseTable";
import {geModelByRoute} from "../../../model/ModelInterface";

export default function ItemEdit() {
    const dispatch = useDispatch()
    const router = useRouter()
    const { slug } = router.query

    const [addItem] = useAddItemMutation()

    const [item, setItem] = useState();
    const [violations, setViolations] = useState([]);
    const [headCells, setHeadCells] = useState<readonly HeadCell[] | null>(null);

    let model: string | null = null;

    if (slug && !item) {
        model = geModelByRoute(slug.toString())

        import(`../../../model/${model}`).then((modelImported) => {
            setItem(new modelImported.default)
            setHeadCells(modelImported.headCells)
        });
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

        addItem(item)
            .then(response => proceedResponse(response, setViolations, dispatch))
            .then(response => {
                router.push(`/dashboard/${slug}/show/${response.data.id}`)
            })
    }

    return (
        <>
            {item &&
                <>
                    <PageHeader title={`Add new ${item['@type']}`}></PageHeader>

                    {headCells && <BaseForm
                        headCells={headCells}
                        onSubmit={onSubmit}
                        violations={violations}
                        item={item}
                        onChange={onChange}
                    ></BaseForm
                    >}
                </>
            }
        </>
    );
}
