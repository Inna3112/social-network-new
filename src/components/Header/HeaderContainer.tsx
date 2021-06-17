import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import Header from './Header';
import {AuthStateType, setAuthUserData} from '../../redux/auth-reducer';
import {meAPI} from '../../api/api';

type MapStatePropsType = {
    userId: number | undefined
    email: string
    login: string
    isAuth: boolean
}
type MapDispatchPropsType = {
    setAuthUserData: (userId: number | undefined, email: string, login: string) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class AuthContainer extends React.Component<PropsType> {

    componentDidMount() {
            meAPI.getMe().then(data => {
            // debugger
                if(data.resultCode === 0){
                    let {id, email, login}  = data.data
                    this.props.setAuthUserData(id, email, login)
                }
        })
    }

    render() {
        return <>
            {/*{this.props.isFetching ? <Preloader /> : null}*/}
            <Header login={this.props.login} isAuth={this.props.isAuth}/>
        </>
    }
}

const mapStateToProps = (state: AppStateType): AuthStateType => {
    return {
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isAuth: state.auth.isAuth,
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    setAuthUserData
})(AuthContainer)

