import React, {FC} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";


type MapStatePropsType = {
    isAuth: boolean
}
type MapDispatchPropsType = {}
type OwnProps = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component: typeof React.Component | FC<any>) => {

    class RedirectComponent extends React.Component<any> {
        render() {
            return (!this.props.isAuth)
                ? <Redirect to='/login'/>
                : <Component {...this.props} />
        }
    }

    let ConnectedAuthRedirectComponent = connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>
    (mapStateToPropsForRedirect, {})(RedirectComponent)

    return ConnectedAuthRedirectComponent
}