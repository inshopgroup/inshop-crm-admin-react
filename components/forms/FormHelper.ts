import {ChangeEvent} from "react";

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
