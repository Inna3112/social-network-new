import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/Post/MyPostsContainer';
import {ProfileType} from '../../redux/profile-reducer';

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
}


const Profile: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
            />
            <MyPostsContainer/>
        </div>

    )
}

export default Profile;