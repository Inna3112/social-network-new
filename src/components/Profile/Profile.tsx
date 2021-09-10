import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/Post/MyPostsContainer';
import {ProfileDataType, ProfileType} from '../../redux/profile-reducer';

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    editMode: boolean
    userId: number | null
    error: string | null
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    toggleEditMode: (mode: boolean) => void
    setProfileData: (profileData: ProfileDataType) => void
}


const Profile: React.FC<PropsType> = ({profile, status, updateStatus,
                                          isOwner, savePhoto, editMode, toggleEditMode, userId,
                                          error, setProfileData}) => {
    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         editMode={editMode}
                         toggleEditMode={toggleEditMode}
                         userId={userId}
                         error={error}
                         setProfileData={setProfileData}
            />
            <MyPostsContainer/>
        </div>

    )
}

export default Profile;