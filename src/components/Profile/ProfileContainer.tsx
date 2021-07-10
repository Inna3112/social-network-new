import React from 'react';
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


type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    posts: Array<PostsType>
    // newPostText: string
    profile: ProfileType
    status: string
}
type MapDispatchPropsType = {
    addPost: (newPostTect: string) => void
    // updateNewPostText: (newText: string) => void
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
}
type OwnProps = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '17259'
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
    }
}

// export default compose(
//     connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
//         addPost, updateNewPostText, getProfile}),
//     withRouter,
//     withAuthRedirect
// )(ProfileContainer);
let WithUrlDataProfileContainer = withRouter(ProfileContainer)

export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
    addPost, getProfile, getStatus, updateStatus
})(WithUrlDataProfileContainer);