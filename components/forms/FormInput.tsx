import TextField from "@mui/material/TextField";
import * as React from "react";
import {findViolation, FormPropsInterface} from "./FormHelper"

export default function FormInput (props: FormPropsInterface) {
    const violation = findViolation(props.violations, props.property)
    const error = violation !== undefined

    return (
        <TextField
            fullWidth
            error={error}
            helperText={!!violation && violation.message}
            name={props.property}
            label={props.label}
            value={props.value}
            onChange={props.onChange}
        />
    )
}
