import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, RouteComponentProps, withRouter} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import {connect} from 'react-redux';
import {AppStateType} from './redux/redux-store';
import {appStateType, initializeApp} from './redux/app-reducer';
import {withSuspense} from "./HOC/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'));

type MapStatePropsType = {
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class App extends React.Component<PropsType & RouteComponentProps> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) {
            return (<h1>Loading...</h1>)
        } else {
            return (
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <Navbar/>
                    <div className="app-wrapper-content">
                        <Route path='/dialogs'
                               render={() => {
                                   return <Suspense fallback={<div>Завантаження...</div>}>
                                       <DialogsContainer/>
                                   </Suspense>
                               }}/>
                        <Route path='/profile/:userId?'
                               render={() => {
                                   return <Suspense fallback={<div>Завантаження...</div>}>
                                       <ProfileContainer/>
                                   </Suspense>
                               }}/>
                        <Route path='/users'
                               render={ withSuspense(UsersContainer) }/>
                        <Route path='/login'
                               render={() => {
                                   return <Suspense fallback={<div>Завантаження...</div>}>
                                       <LoginContainer/>
                                   </Suspense>
                               }}/>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state: AppStateType): appStateType => {
    return {
        initialized: state.app.initialized
    }
}

let AppWithRouter = withRouter(App)
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    initializeApp
})(AppWithRouter)
