import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import Header from './Header';
import {logout} from '../../redux/auth-reducer';
import {compose} from "redux";


type MapStatePropsType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    logout: () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class AuthContainer extends React.Component<PropsType> {

    render() {
        return <>
            {/*{this.props.isFetching ? <Preloader /> : null}*/}
            <Header login={this.props.login} isAuth={this.props.isAuth} logout={this.props.logout}/>
        </>
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

// export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
//      logout
// })(AuthContainer)

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {logout}))(AuthContainer)

