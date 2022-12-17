import {Grid} from "@mui/material";
import FormInput from "./forms/FormInput";
import FormCheckbox from "./forms/FormCheckbox";
import Button from "@mui/material/Button";
import * as React from "react";
import {ViolationInterface} from "./forms/FormHelper";
import Label from "../model/Label";
import {ChangeEvent, FormEvent} from "react";

export interface LabelFormProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    violations: ViolationInterface[];
    item: Label;
}

export default function LabelForm(props: LabelFormProps) {
    return (
        <form onSubmit={props.onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormInput
                        violations={props.violations}
                        property="name"
                        value={props.item.name}
                        label="Name"
                        onChange={props.onChange}
                    ></FormInput>
                </Grid>
                <Grid item xs={12}>
                    <FormCheckbox
                        violations={props.violations}
                        property="isActive"
                        label="Is active"
                        value={props.item.isActive}
                        onChange={props.onChange}
                    ></FormCheckbox>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Save</Button>
                </Grid>
            </Grid>
        </form>
    )
}
