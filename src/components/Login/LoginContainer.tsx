import React, {ComponentType} from 'react';
import {logIn} from '../../redux/auth-reducer';
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import Login from "./Login";
import {compose} from "redux";


type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {
    logIn: (email: string | null, password: string | null, rememberMe: boolean) => void
}
type OwnPropsType = {}
export  type LoginFormPropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class LoginContainer extends React.Component <LoginFormPropsType> {

    render() {
        return (
            <Login logIn={this.props.logIn} isAuth={this.props.isAuth} />
        )
    }
}

const MapStateToProps = (state: AppStateType) => ({isAuth: state.auth.isAuth})


export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(MapStateToProps, {
        logIn})
)(LoginContainer)