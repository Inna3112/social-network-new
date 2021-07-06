import React from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    addPost, getProfile,
    PostsType,
    ProfileType,
    updateNewPostText
} from '../../redux/profile-reducer';
import { RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../HOC/withAuthRedirect';
import {compose} from 'redux';


type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    posts: Array<PostsType>
    newPostText: string
    profile: ProfileType
}
type MapDispatchPropsType = {
    addPost: () => void
    updateNewPostText: (newText: string) => void
    getProfile: (userId: string) => void
}
type OwnProps = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getProfile(userId)
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}
// const AuthRedirectComponent = withAuthRedirect(ProfileContainer)

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
        profile: state.profilePage.profile,
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
    addPost, updateNewPostText, getProfile
})(WithUrlDataProfileContainer);