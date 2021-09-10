import React, {ComponentType} from 'react';
import {logIn} from '../../redux/auth-reducer';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import Login from './Login';
import {compose} from 'redux';


type MapStatePropsType = {
    isAuth: boolean
    captchaUrl: string
}
type MapDispatchPropsType = {
    logIn: (email: string | null, password: string | null, rememberMe: boolean, captcha: string) => void
}
type OwnPropsType = {}
export  type LoginFormPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class LoginContainer extends React.Component <LoginFormPropsType> {

    render() {
        return (
            <Login logIn={this.props.logIn}
                   isAuth={this.props.isAuth}
                   captchaUrl={this.props.captchaUrl}
            />
        )
    }
}

const MapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})


export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(MapStateToProps, {
        logIn})
)(LoginContainer)