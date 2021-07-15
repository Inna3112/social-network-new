import React from 'react';
import LoginReduxForm, {LoginFormValuesType} from './LoginForm/LoginForm';

export  type LoginFormPropsType = {
    logIn: (email: string | null, password: string | null, rememberMe: boolean) => void
    isAuth: boolean
}
const Login: React.FC<LoginFormPropsType> = ({logIn, isAuth}) => {

    const onSubmit = (formData: LoginFormValuesType) => {
        logIn(formData.email, formData.password, formData.rememberMe)
        // console.log(formData)
    }


    return (
        // {isAuth} ? <Redirect to={'/profile'} />
        // :
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )}

export default Login