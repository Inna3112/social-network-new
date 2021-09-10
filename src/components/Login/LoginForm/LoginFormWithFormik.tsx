import React from 'react';
import {useFormik} from 'formik';

type PropsType = {
    logIn: (email: string | null, password: string | null, rememberMe: boolean, captcha: string) => void
    captchaUrl: string
}
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
}

export const LoginFormWithFormik: React.FC<PropsType> = ({logIn, captchaUrl}) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: '',
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
            // if (!values.captcha) {
            //     errors.captcha = 'Required';
            // }
            return errors
        },
        onSubmit: values => {
            logIn(values.email, values.password, values.rememberMe, values.captcha)
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
                {/*{formik.touched.rememberMe && formik.errors.rememberMe ? <div style={{color: 'red'}}>{formik.errors.rememberMe}</div> : null}*/}
            </div>
            {captchaUrl &&
            <div>
                <input {...formik.getFieldProps('captcha')} />
                {formik.touched.captcha && formik.errors.captcha ? <div style={{color: 'red'}}>{formik.errors.captcha}</div> : null}
            </div>}
            {captchaUrl && <div><img src={captchaUrl} alt="captchaUrl"/></div>}
            <div>
                <button type='submit'>Login</button>
            </div>
        </form>
    )
}

export default LoginFormWithFormik
