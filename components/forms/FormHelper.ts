import {ChangeEvent, Dispatch} from "react";
import {setSnackbar} from "../../store/loaderSlice";

export interface ViolationInterface {
    code: string;
    message: string;
    propertyPath: string;
}

export interface FormPropsInterface {
    violations: ViolationInterface[];
    property: string;
    label: string;
    value: any;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const findViolation = (violations: ViolationInterface[], property: string) => {
    return violations.find(violation => violation.propertyPath === property)
}

export const proceedResponse = (response: any, setViolations: Function, dispatch: Dispatch<any>) => {
    if (response.error) {
        if (response.error.data && response.error.data.violations) {
            setViolations(response.error.data.violations)
        }
    } else {
        dispatch(setSnackbar({
            message: 'Successfully saved',
            severity: 'success',
        }))

        return response
    }
}
