import React from 'react';
import s from './ProfileData.module.css'
import {ProfileType} from '../../../../redux/profile-reducer';


type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    toggleEditMode: (mode: boolean) => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, toggleEditMode}) => {
    const activateEditMode = () => {
        toggleEditMode(true)
    }
    return (
        <div className={s.profileItem}>
            <div className={s.profileItem}><b>My name:</b> {profile.fullName}</div>
            <div className={s.profileItem}><b>About me:</b> {profile.aboutMe}</div>
            <div className={s.profileItem}><b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}</div>
            {
                profile.lookingForAJob &&
                <div className={s.profileItem}><b>My professional skills:</b> {profile.lookingForAJobDescription}</div>
            }
            <div><b>My contacts:</b></div>
            <div className={s.contact}><b>Facebook:</b>{profile.contacts.facebook ? profile.contacts.facebook : ''}</div>
            <div className={s.contact}><b>Github:</b>{profile.contacts.github ? profile.contacts.github : ''}</div>
            <div className={s.contact}><b>Instagram:</b>{profile.contacts.instagram ? profile.contacts.instagram : ''}</div>
            <div className={s.contact}><b>Twitter:</b>{profile.contacts.twitter ? profile.contacts.twitter : ''}</div>
            <div className={s.contact}><b>Vk:</b>{profile.contacts.vk ? profile.contacts.vk : ''}</div>
            <div className={s.contact}><b>Youtube:</b>{profile.contacts.youtube ? profile.contacts.youtube : ''}</div>
            <div className={s.contact}><b>Website:</b>{profile.contacts.website ? profile.contacts.website : ''}</div>
            <div className={s.contact}><b>MainLink:</b>{profile.contacts.mainLink ? profile.contacts.mainLink : ''}</div>
            {isOwner && <div><button onClick={activateEditMode}>Change data</button></div>}
        </div>
    )
}

export default ProfileData
