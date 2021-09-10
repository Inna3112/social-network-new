import React, {ComponentType} from 'react';
import Profile from './Profile';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    addPost, getProfile, getStatus,
    PostsType, ProfileDataType,
    ProfileType, savePhoto, setProfileData, toggleEditMode,
    updateStatus
} from '../../redux/profile-reducer';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../HOC/withAuthRedirect';
import {compose} from 'redux';


type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    posts: Array<PostsType>
    profile: ProfileType
    status: string
    authorizedId: number | null
    isAuth: boolean
    editMode: boolean
    userId: number | null
    error: string | null
}
type MapDispatchPropsType = {
    addPost: (newPostTect: string) => void
    getProfile: (userId: number | null) => void
    getStatus: (userId: number | null) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    toggleEditMode: (mode: boolean) => void
    setProfileData: (profileData: ProfileDataType) => void
}
type OwnProps = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile(){
        let userId: number | null = Number(this.props.match.params.userId)
        if (!userId) {
            userId = this.props.authorizedId
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if(this.props.match.params.userId !== prevProps.match.params.userId)
        this.refreshProfile()
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto}
                        editMode={this.props.editMode}
        />
    }
}

// const AuthRedirectComponent = withAuthRedirect(ProfileContainer)

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedId: state.auth.userId,
        isAuth: state.auth.isAuth,
        editMode: state.profilePage.editMode,
        userId: state.auth.userId,
        error: state.app.error,
    }
}

export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
        addPost, getProfile, getStatus, updateStatus, savePhoto, toggleEditMode, setProfileData,
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);

// let WithUrlDataProfileContainer = withRouter(ProfileContainer)
//
// export default connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, {
//     addPost, getProfile, getStatus, updateStatus
// })(WithUrlDataProfileContainer);