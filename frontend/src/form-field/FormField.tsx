
import styles from './FormField.module.css';
import { INewOption, INewQuestion, InputField } from "../quiz.types";
import React from "react";

export function FormField( { children, fieldObj, errorMessageLayoutClass="col-12" }: { children: React.ReactNode, fieldObj: InputField<string | number | INewQuestion[] | INewOption[] > | undefined, errorMessageLayoutClass?: string } ) {
    return (
        <>
            { children }
            {
                fieldObj?.error && <p className={ `${errorMessageLayoutClass} m-0 p-0 ${styles.errorMessage}` }> { fieldObj?.error } </p>
            }
        </>
    )
}