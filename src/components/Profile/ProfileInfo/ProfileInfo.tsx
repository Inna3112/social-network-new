import React from 'react';
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../redux/profile-reducer';
import Preloader from '../../../common/Preloader/Preloader';

type PropsType = {
    profile: ProfileType
}


const ProfileInfo = (props: PropsType) => {
    if(!props.profile){
        return <Preloader />
    }
    return (
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <div>
                    <div className={s.profileItem}>My name: {props.profile.fullName}</div>
                    <div className={s.profileItem}>About me: {props.profile.aboutMe}</div>
                    <div className={s.profileItem}>Looking for a job: {props.profile.lookingForAJob ? 'Yes' : 'No'}</div>
                    <div className={s.profileItem}>Job description: {props.profile.lookingForAJobDescription}</div>
                    <div className={s.profileItem}>My contacts:
                        <div className={s.contact}>{props.profile.contacts.facebook}</div>
                        <div className={s.contact}>{props.profile.contacts.github}</div>
                        <div className={s.contact}>{props.profile.contacts.instagram}</div>
                        <div className={s.contact}>{props.profile.contacts.twitter}</div>
                        <div className={s.contact}>{props.profile.contacts.vk}</div>
                        <div className={s.contact}>{props.profile.contacts.youtube}</div>
                        <div className={s.contact}>{props.profile.contacts.website}</div>
                        <div className={s.contact}>{props.profile.contacts.mainLink}</div>
                    </div>
                </div>
            </div>

    )
}

export default ProfileInfo;