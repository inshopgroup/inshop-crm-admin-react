import { ChangeEvent, FormEvent, ReactNode } from 'react'
import {Grid} from "@mui/material";
import FormInput from "./forms/FormInput";
import FormCheckbox from "./forms/FormCheckbox";
import Button from "@mui/material/Button";
import * as React from "react";
import {ViolationInterface} from "./forms/FormHelper";
import {HeadCell} from "./BaseTable";

export interface BaseFormProps {
    headCells: readonly HeadCell[];
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    violations: ViolationInterface[];
    item: any;
    children?: ReactNode
}

export default function BaseForm(props: BaseFormProps) {
  const {
    item,
    headCells,
    violations,
    children = null,
    onChange,
    onSubmit,
  } = props

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
                {headCells.map((headCell) => headCell.visibleInEdit && (
                    <Grid item xs={12} key={headCell.id}>
                        {headCell.type === 'string' && (
                            <FormInput
                                violations={violations}
                                property={headCell.id}
                                value={item[headCell.id]}
                                label={headCell.label}
                                onChange={onChange}
                            ></FormInput>
                        )}

                        {headCell.type === 'boolean' && (
                            <FormCheckbox
                                violations={violations}
                                property={headCell.id}
                                value={item[headCell.id]}
                                label={headCell.label}
                                onChange={onChange}
                            ></FormCheckbox>
                        )}
                    </Grid>
                ))}
                {children}
            </Grid>
        </form>
    )
}
