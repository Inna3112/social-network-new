import React, {ChangeEvent} from 'react';
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../redux/profile-reducer';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import avaPost from './../../../assets/images/avaPost.png'

type PropsType = {
    profile: ProfileType
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
}


const ProfileInfo: React.FC<PropsType> = ({profile, updateStatus, status, isOwner, savePhoto}) => {
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
                <ProfileData />

            </div>
        </div>

    )
}

export default ProfileInfo;

type ProfileDataPropsType = {
    profile: ProfileType
}

export const ProfileData: React.FC<ProfileDataPropsType> = ({profile}) => {
    return (
        <div className={s.profileItem}><b>My contacts:</b>
            <div className={s.contact}>{profile.contacts.facebook ? profile.contacts.facebook : ''}</div>
            <div className={s.contact}>{profile.contacts.github ? profile.contacts.github : ''}</div>
            <div className={s.contact}>{profile.contacts.instagram ? profile.contacts.instagram : ''}</div>
            <div className={s.contact}>{profile.contacts.twitter ? profile.contacts.twitter : ''}</div>
            <div className={s.contact}>{profile.contacts.vk ? profile.contacts.vk : ''}</div>
            <div className={s.contact}>{profile.contacts.youtube ? profile.contacts.youtube : ''}</div>
            <div className={s.contact}>{profile.contacts.website ? profile.contacts.website : ''}</div>
            <div className={s.contact}>{profile.contacts.mainLink ? profile.contacts.mainLink : ''}</div>
        </div>
    )
}
