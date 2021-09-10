import React from 'react';
import {useFormik} from 'formik';
import {ProfileDataType, ProfileType} from '../../../../redux/profile-reducer';
import s from './ProfileDataForm.module.css'

type PropsType = {
    profile: ProfileType
    userId: number | null
    error: string | null
    setProfileData: (profileData: ProfileDataType) => void
}

const ProfileDataForm: React.FC<PropsType> = ({profile, error, userId,
                                                  setProfileData}) => {

    const formik = useFormik({
        initialValues: {
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            facebook: profile.contacts.facebook,
            github: profile.contacts.github,
            instagram: profile.contacts.instagram,
            twitter: profile.contacts.twitter,
            vk: profile.contacts.vk,
            youtube: profile.contacts.youtube,
            website: profile.contacts.website,
            mainLink: profile.contacts.mainLink,
        },
        onSubmit: values => {
            setProfileData({
                userId, fullName: values.fullName, aboutMe: values.aboutMe,
                lookingForAJobDescription: values.lookingForAJobDescription, lookingForAJob: values.lookingForAJob,
                contacts: {
                    facebook: values.facebook,
                    mainLink: values.mainLink,
                    website: values.website,
                    youtube: values.youtube,
                    vk: values.vk,
                    twitter: values.twitter,
                    instagram: values.instagram,
                    github: values.github
                }
            })
            //зачищаем форму
            formik.resetForm()
        }
    })
    return (
        <form className={s.formStyle} onSubmit={formik.handleSubmit}>

            <div className={s.inputElement}>
                <label htmlFor="fullName"><b>Full name:</b></label>
                <input {...formik.getFieldProps('fullName')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="aboutMe"><b>About me:</b></label>
                <textarea {...formik.getFieldProps('aboutMe')}/>
            </div>
            <div className={s.checkboxStyle}>
                <label htmlFor="lookingForAJob"><b>Looking for a job:</b></label>
                <input type={'checkbox'} {...formik.getFieldProps('lookingForAJob')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="lookingForAJobDescription"><b>Job description:</b></label>
                <textarea {...formik.getFieldProps('lookingForAJobDescription')}/>
            </div>
            <div className={s.inputElement}>
                <label><b>Contacts:</b></label>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="facebook"><b>Facebook:</b></label>
                <input {...formik.getFieldProps('facebook')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="github"><b>Github:</b></label>
                <input {...formik.getFieldProps('github')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="instagram"><b>Instagram:</b></label>
                <input {...formik.getFieldProps('instagram')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="vk"><b>VKontakte:</b></label>
                <input {...formik.getFieldProps('vk')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="youtube"><b>Youtube:</b></label>
                <input {...formik.getFieldProps('youtube')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="website"><b>Website:</b></label>
                <input {...formik.getFieldProps('website')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="mainLink"><b>Main Link:</b></label>
                <input {...formik.getFieldProps('mainLink')}/>
            </div>
            {error ? <div style={{color: 'red'}}>{error}</div> : ''}
            <div>
                <button type='submit'>Save</button>
            </div>

        </form>
    )
}

export default ProfileDataForm
