import { useState } from 'react';
import {useGetItemQuery} from "../../../../store/crud";
import {useRouter} from "next/router";
import {skipToken} from "@reduxjs/toolkit/query";

import { Grid } from '@mui/material'
import PageHeader from "../../../../layouts/PageHeader";
import BaseShow from "../../../../components/BaseShow";
import {geModelByRoute, ModelInterface} from "../../../../model/ModelInterface";
import {HeadCell} from "../../../../components/BaseTable";
import PageAction from "../../../../components/PageAction";

export default function ItemShow() {
    const router = useRouter()
    const { slug, id: paramId }: { slug?: string; id?: string } = router.query
    const id = paramId ? parseInt(paramId.toString()) : undefined

    const [headCells, setHeadCells] = useState<readonly HeadCell[] | null>(null);
    const [model, setModel] = useState<string | null>(null);

    const { data }: { data?: ModelInterface | undefined; } = useGetItemQuery(
        id && model ? { id, '@type': model } : skipToken
    )

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

    return (
        data && headCells &&
        <>
          <PageHeader title={data.name}></PageHeader>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <BaseShow headCells={headCells} item={data}></BaseShow>
            </Grid>
            {id && slug && model && <PageAction id={id} slug={slug} model={model} />}
          </Grid>
        </>
    );
}
