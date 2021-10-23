import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import {connect} from 'react-redux';
import {AppStateType} from './redux/redux-store';
import {appStateType, initializeAppAC} from './redux/app-reducer';
import {withSuspense} from './HOC/withSuspense';
import ErrorBoundary from './common/ErrorBoundary/ErrorBoundary';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'));

type MapStatePropsType = {
    initialized: boolean,
    error: string | null,
}
type MapDispatchPropsType = {
    // initializeApp: () => void
    initializeAppAC: () => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class App extends React.Component<PropsType & RouteComponentProps> {
    componentDidMount() {
        // this.props.initializeApp()
        this.props.initializeAppAC()
    }

    render() {
        if (!this.props.initialized) {
            return (<h1>Loading...</h1>)
        } else {
            return (
                <div className="app-wrapper">
                    <HeaderContainer/>
                    <ErrorBoundary>
                        <Navbar/>
                    </ErrorBoundary>
                    <div className="app-wrapper-content">
                        <Switch>
                            <Route exact path='/'
                                   render={() => <Redirect to={'/profile'}/>}/>
                            <Route path='/dialogs'
                                   render={withSuspense(DialogsContainer)}/>
                            <Route path='/profile/:userId?'
                                   render={withSuspense(ProfileContainer)}/>
                            <Route path='/users'
                                   render={withSuspense(UsersContainer)}/>
                            <Route path='/login'
                                   render={withSuspense(LoginContainer)}/>
                            <Route path='*'
                                   render={() => '404 NOT FOUND'}/>
                        </Switch>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state: AppStateType): appStateType => {
    return {
        initialized: state.app.initialized,
        error: null,
    }
}

let AppWithRouter = withRouter(App)
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    initializeAppAC
})(AppWithRouter)
