import React from 'react';
import s from './ProfileData.module.css'
import {ProfileType} from '../../../../redux/profile-reducer';


type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    activateEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, activateEditMode}) => {

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
            {isOwner && <div><button onClick={activateEditMode}>Change data</button></div>}
        </div>
    )
}

export default ProfileData
