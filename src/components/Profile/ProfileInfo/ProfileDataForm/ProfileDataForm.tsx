import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {AppStateType} from '../../../../redux/redux-store';
import {setProfileData} from '../../../../redux/profile-reducer';
import s from './ProfileDataForm.module.css'

type PropsType = {
    deactivateEditMode: () => void
}

const ProfileDataForm: React.FC<PropsType> = ({deactivateEditMode}) => {
    const userId = useSelector<AppStateType, number | null>(state => state.auth.userId)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            fullName: '',
            aboutMe: '',
            lookingForAJob: false,
            lookingForAJobDescription: '',
            facebook: '',
            github: '',
            instagram: '',
            twitter: '',
            vk: '',
            youtube: '',
            website: '',
            mainLink: '',
        },
        onSubmit: values => {
            dispatch(setProfileData({userId, fullName: values.fullName, aboutMe: values.aboutMe,
                lookingForAJobDescription: values.lookingForAJobDescription, lookingForAJob: values.lookingForAJob,
                contacts: {facebook: values.facebook, mainLink: values.mainLink, website: values.website, youtube: values.youtube,
                vk: values.vk, twitter: values.twitter, instagram: values.instagram, github: values.github}}))
            //зачищаем форму
            formik.resetForm()
            deactivateEditMode()
        }
    })
    return (

        <form onSubmit={formik.handleSubmit}>
            <div className={s.inputElement}>
                <label htmlFor="fullName"><b>Full name</b></label>
                <input {...formik.getFieldProps('fullName')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="aboutMe"><b>About me</b></label>
                <textarea {...formik.getFieldProps('aboutMe')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="lookingForAJob"><b>Looking for a job</b></label>
                <input type={'checkbox'} {...formik.getFieldProps('lookingForAJob')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="lookingForAJobDescription"><b>Job description</b></label>
                <textarea {...formik.getFieldProps('lookingForAJobDescription')}/>
            </div>
            <div className={s.inputElement}>
                <label><b>Contacts:</b></label>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="facebook"><b>Facebook</b></label>
                <input {...formik.getFieldProps('facebook')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="github"><b>Github</b></label>
                <input {...formik.getFieldProps('github')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="instagram"><b>Instagram</b></label>
                <input {...formik.getFieldProps('instagram')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="vk"><b>VKontakte</b></label>
                <input {...formik.getFieldProps('vk')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="youtube"><b>Youtube</b></label>
                <input {...formik.getFieldProps('youtube')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="website"><b>Website</b></label>
                <input {...formik.getFieldProps('website')}/>
            </div>
            <div className={s.inputElement}>
                <label htmlFor="mainLink"><b>Main Link</b></label>
                <input {...formik.getFieldProps('mainLink')}/>
            </div>
            <div>
                <button type='submit'>Save</button>
            </div>
        </form>
    )
}

export default ProfileDataForm
