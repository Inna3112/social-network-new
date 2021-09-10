import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../redux/profile-reducer';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import avaPost from './../../../assets/images/avaPost.png'
import ProfileData from './ProfileData/ProfileData';
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    editMode: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    toggleEditMode: (mode: boolean) => void
}


const ProfileInfo: React.FC<PropsType> = ({profile, updateStatus, status,
                                              isOwner, savePhoto, editMode, toggleEditMode}) => {

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
                {editMode
                    ? <ProfileDataForm  />
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   toggleEditMode={toggleEditMode}
                                   />}
            </div>
        </div>

    )
}

export default ProfileInfo;

