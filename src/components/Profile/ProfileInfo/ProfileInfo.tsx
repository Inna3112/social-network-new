import React from 'react';
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../redux/profile-reducer';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatus/ProfileStatusWithHooks';
import avaPost from './../../../assets/images/avaPost.png'

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
}


const ProfileInfo: React.FC<PropsType> = ({profile, updateStatus, status}) => {
    if(!profile){
        return <Preloader />
    }
    return (
            <div className={s.descriptionBlock}>
                <img className={s.mainPhoto} src={profile.photos.large || avaPost} alt={'Main photo'}/>

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />

                <div>
                    <div className={s.profileItem}>My name: {profile.fullName}</div>
                    <div className={s.profileItem}>About me: {profile.aboutMe}</div>
                    <div className={s.profileItem}>Looking for a job: {profile.lookingForAJob ? 'Yes' : 'No'}</div>
                    <div className={s.profileItem}>Job description: {profile.lookingForAJobDescription}</div>
                    <div className={s.profileItem}>My contacts:
                        <div className={s.contact}>{profile.contacts.facebook}</div>
                        <div className={s.contact}>{profile.contacts.github}</div>
                        <div className={s.contact}>{profile.contacts.instagram}</div>
                        <div className={s.contact}>{profile.contacts.twitter}</div>
                        <div className={s.contact}>{profile.contacts.vk}</div>
                        <div className={s.contact}>{profile.contacts.youtube}</div>
                        <div className={s.contact}>{profile.contacts.website}</div>
                        <div className={s.contact}>{profile.contacts.mainLink}</div>
                    </div>
                </div>
            </div>

    )
}

export default ProfileInfo;