import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import Header from './Header';
import {getMe, logout} from '../../redux/auth-reducer';


type MapStatePropsType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    getMe: () => void
    logout: () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class AuthContainer extends React.Component<PropsType> {

    componentDidMount() {
            this.props.getMe()
    }

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

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    getMe, logout
})(AuthContainer)

