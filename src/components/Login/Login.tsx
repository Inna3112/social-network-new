import React from 'react';
import LoginReduxForm, {LoginFormValuesType} from './LoginForm/LoginForm';
import {Redirect} from "react-router-dom";
import { logIn } from '../../redux/auth-reducer';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

export  type LoginFormPropsType = {
    logIn: (email: string | null, password: string | null, rememberMe: boolean) => void
    // isAuth: boolean
}
const Login: React.FC<LoginFormPropsType> = ({logIn}) => {

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
const MapStateToProps = (state: AppStateType) => ({isAuth: state.auth.isAuth})

export default connect(MapStateToProps, {logIn})(Login)