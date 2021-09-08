import React from 'react';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import {logIn} from '../../../redux/auth-reducer';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const LoginFormWithFormik = () => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 4) {
                errors.password = 'Must be 4 characters or more';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(logIn(values.email, values.password, values.rememberMe))
            //зачищаем форму
            formik.resetForm()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
            </div>
            <div>
                <input type={'password'} {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
            </div>
            <div>
                <input type={'checkbox'} {...formik.getFieldProps('rememberMe')} />
                {formik.touched.rememberMe && formik.errors.rememberMe ? <div style={{color: 'red'}}>{formik.errors.rememberMe}</div> : null}
            </div>
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    )
}

export default LoginFormWithFormik
