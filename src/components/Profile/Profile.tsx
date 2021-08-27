import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/Post/MyPostsContainer';
import {ProfileType} from '../../redux/profile-reducer';

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}


const Profile: React.FC<PropsType> = ({profile, status, updateStatus}) => {
    return (
        <div>
            <ProfileInfo profile={profile} status={status}
                         updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>

    )
}

export default Profile;