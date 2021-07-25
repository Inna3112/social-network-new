import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    addPost, getProfile, getStatus,
    PostsType,
    ProfileType,
    updateStatus
} from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";


type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    posts: Array<PostsType>
    // newPostText: string
    profile: ProfileType
    status: string
    authorizedId: number | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    addPost: (newPostTect: string) => void
    // updateNewPostText: (newText: string) => void
    getProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
}
type OwnProps = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
    let userId: number | null = Number(this.props.match.params.userId)
    if (!userId) {
        userId = this.props.authorizedId
        if(!userId) {
            this.props.history.push('/login')
        }
    }
    this.props.getProfile(userId)
    this.props.getStatus(userId)
}
    render() {
        return <Profile {...this.props} profile={this.props.profile}
                        status={this.props.status} updateStatus={this.props.updateStatus}/>
    }
}
// const AuthRedirectComponent = withAuthRedirect(ProfileContainer)

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        // newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedId: state.auth.userId,
        isAuth: state.auth.isAuth,
    }
}

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
        addPost, getProfile, getStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

// let WithUrlDataProfileContainer = withRouter(ProfileContainer)
//
// export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
//     addPost, getProfile, getStatus, updateStatus
// })(WithUrlDataProfileContainer);