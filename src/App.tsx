import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, RouteComponentProps, withRouter} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from "./components/Login/LoginContainer";
import {connect} from "react-redux";
import {AppStateType} from "./redux/redux-store";
import {appStateType, initializeApp} from "./redux/app-reducer";

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
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route path='/dialogs' render={() => <DialogsContainer
                    />}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer
                    />}/>
                    <Route path='/users' render={() => <UsersContainer/>}/>
                    <Route path='/login' render={() => <LoginContainer/>}/>
                </div>
            </div>
        )
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
