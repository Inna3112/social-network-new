import React from 'react';
import LoginReduxForm, {LoginFormValuesType} from './LoginForm/LoginForm';
import {Redirect} from "react-router-dom";

export  type LoginFormPropsType = {
    logIn: (email: string | null, password: string | null, rememberMe: boolean) => void
    isAuth: boolean
}
const Login: React.FC<LoginFormPropsType> = ({logIn, isAuth}) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        logIn(formData.email, formData.password, formData.rememberMe)
        // console.log(formData)
    }


    if (isAuth) {
        return (<Redirect to={'/profile'}/>)
    } else {
        return (<div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>)
    }
}

export default Login