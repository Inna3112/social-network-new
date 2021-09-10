import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginFormWithFormik from './LoginForm/LoginFormWithFormik';

export  type LoginFormPropsType = {
    logIn: (email: string | null, password: string | null, rememberMe: boolean, captcha: string) => void
    isAuth: boolean
    captchaUrl: string
}
const Login: React.FC<LoginFormPropsType> = React.memo(({logIn, isAuth, captchaUrl}) => {

    // const onSubmit = (formData: LoginFormValuesType) => {
    //     logIn(formData.email, formData.password, formData.rememberMe)
        // console.log(formData)
    // }

    if (isAuth) {
        return (<Redirect to={'/profile'}/>)
    } else {
        return (<div>
            <h1>Login</h1>
            <LoginFormWithFormik logIn={logIn}
                                 captchaUrl={captchaUrl}
            />
            {/*<LoginReduxForm onSubmit={onSubmit}/>*/}
        </div>)
    }
})

export default Login