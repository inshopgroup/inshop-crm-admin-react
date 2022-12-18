import {Grid} from "@mui/material";
import FormInput from "./forms/FormInput";
import FormCheckbox from "./forms/FormCheckbox";
import Button from "@mui/material/Button";
import * as React from "react";
import {ViolationInterface} from "./forms/FormHelper";
import {ChangeEvent, FormEvent} from "react";
import {HeadCell} from "./ApiTable";

export interface BaseFormProps {
    headCells: readonly HeadCell[];
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    violations: ViolationInterface[];
    item: any;
}

export default function BaseForm(props: BaseFormProps) {
    return (
        <form onSubmit={props.onSubmit}>
            <Grid container spacing={2}>
                {props.headCells.map((headCell) => headCell.visibleInEdit && (
                    <Grid item xs={12} key={headCell.id}>
                        {headCell.type === 'string' && (
                            <FormInput
                                violations={props.violations}
                                property={headCell.id}
                                value={props.item[headCell.id]}
                                label={headCell.label}
                                onChange={props.onChange}
                            ></FormInput>
                        )}

                        {headCell.type === 'boolean' && (
                            <FormCheckbox
                                violations={props.violations}
                                property={headCell.id}
                                value={props.item[headCell.id]}
                                label={headCell.label}
                                onChange={props.onChange}
                            ></FormCheckbox>
                        )}
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Save</Button>
                </Grid>
            </Grid>
        </form>
    )
}
