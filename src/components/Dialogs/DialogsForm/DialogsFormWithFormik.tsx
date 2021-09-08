import React from 'react';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import { addMessageAC } from '../../../redux/dialogs-reducer';


 export const DialogsFormWithFormik = () => {
     const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            messageBody: '',
        },
        validate: values => {
            const errors: { messageBody?: string } = {};
            if (values.messageBody.length > 10) {
                errors.messageBody = 'Must be 10 characters or less';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(addMessageAC(values.messageBody))
            formik.resetForm()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <textarea
                {...formik.getFieldProps('messageBody')}
            />
            {formik.touched.messageBody && formik.errors.messageBody ? <div style={{color: 'red'}}>{formik.errors.messageBody}</div> : null}
            <div>
                <button type='submit'>Send message</button>
            </div>
        </form>
    )
}

