import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/Post/MyPostsContainer';
import {ProfileType} from '../../redux/profile-reducer';

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    editMode: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    toggleEditMode: (mode: boolean) => void
}


const Profile: React.FC<PropsType> = ({profile, status, updateStatus,
                                          isOwner, savePhoto, editMode, toggleEditMode}) => {
    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         editMode={editMode}
                         toggleEditMode={toggleEditMode}
            />
            <MyPostsContainer/>
        </div>

    )
}

export default Profile;