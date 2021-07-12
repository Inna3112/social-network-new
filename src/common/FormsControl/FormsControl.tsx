import React from 'react';
import s from './FormControl.module.css'
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type PropsType = {
    meta: WrappedFieldMetaProps
}
const FormControl: React.FC<PropsType> = ({ meta, children}) => {
    const hasError = meta.error && meta.touched

    return (
        <div className={s.formControl + ' ' +(hasError ? s.error : '')}>
            {children}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props

    return (

        <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>

    )
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props

    return (
        <FormControl {...props}><input {...input} {...restProps} /></FormControl>
    )
}