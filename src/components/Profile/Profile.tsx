import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/Post/MyPostsContainer';
import {ProfileType} from '../../redux/profile-reducer';

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}


const Profile = (props: PropsType) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}
                         updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>

    )
}

export default Profile;