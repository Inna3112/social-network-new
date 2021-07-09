import React from 'react';
import LoginReduxForm from './LoginForm/LoginForm';

export  type LoginFormValuesType = {
    // login: string
    // password: string
    // rememberMe: boolean
}
const Login: React.FC<LoginFormValuesType> = () => {

    const onSubmit = (submitData: {}) => {
        console.log(submitData)
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit ={onSubmit} />
    </div>
}

export default Login