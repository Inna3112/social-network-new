import React, {ChangeEvent, useState} from 'react';
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../redux/profile-reducer';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import avaPost from './../../../assets/images/avaPost.png'
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
}


const ProfileInfo: React.FC<PropsType> = ({profile, updateStatus, status, isOwner, savePhoto}) => {
    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
    }

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div className={s.descriptionBlock}>
            <img className={s.mainPhoto} src={profile.photos.large || avaPost} alt={'Main photo'}/>

            {
                isOwner &&
                <div>
                    <input type='file' onChange={onMainPhotoSelected}/>
                </div>
            }

            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

            <div>
                <div className={s.profileItem}><b>My name:</b> {profile.fullName}</div>
                <div className={s.profileItem}><b>About me:</b> {profile.aboutMe}</div>
                <div className={s.profileItem}><b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}</div>
                {
                    profile.lookingForAJob &&
                    <div className={s.profileItem}><b>My professional skills:</b> {profile.lookingForAJobDescription}</div>
                }

                {editMode
                    ? <ProfileDataForm deactivateEditMode={deactivateEditMode} />
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   activateEditMode={activateEditMode}/>}
            </div>
        </div>

    )
}

export default ProfileInfo;

