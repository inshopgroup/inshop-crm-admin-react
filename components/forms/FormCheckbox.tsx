import * as React from "react";
import {findViolation, FormPropsInterface} from "./FormHelper"
import {Checkbox, FormControlLabel, FormHelperText} from "@mui/material";

export default function FormCheckbox (props: FormPropsInterface) {
    const violation = findViolation(props.violations, props.property)
    const error = violation !== undefined

    return (
        <>
            <FormControlLabel
                label={props.label}
                control={
                    <Checkbox
                        name={props.property}
                        checked={props.value}
                        onChange={props.onChange}
                        color={error ? 'error' : 'primary'}
                    />
                }
            />
            {error && <FormHelperText error={true}>{violation.message}</FormHelperText>}
        </>
    )
}
