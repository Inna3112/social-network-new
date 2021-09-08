import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {AppStateType} from '../../../../redux/redux-store';
import {setProfileData} from "../../../../redux/profile-reducer";

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
            <label htmlFor="fullName">Full name</label>
            <input {...formik.getFieldProps('fullName')}/>

            <label htmlFor="aboutMe">About me</label>
            <textarea {...formik.getFieldProps('aboutMe')}/>

            <label htmlFor="lookingForAJob">Looking for a job</label>
            <input type={'checkbox'} {...formik.getFieldProps('lookingForAJob')}/>

            <label htmlFor="lookingForAJobDescription">Job description</label>
            <textarea {...formik.getFieldProps('lookingForAJobDescription')}/>

            <label>Contacts:</label>
            <label htmlFor="facebook">Facebook</label>
            <input {...formik.getFieldProps('facebook')}/>

            <label htmlFor="github">Github</label>
            <input {...formik.getFieldProps('github')}/>

            <label htmlFor="instagram">Instagram</label>
            <input {...formik.getFieldProps('instagram')}/>

            <label htmlFor="vk">VKontakte</label>
            <input {...formik.getFieldProps('vk')}/>

            <label htmlFor="youtube">Youtube</label>
            <input {...formik.getFieldProps('youtube')}/>

            <label htmlFor="website">Website</label>
            <input {...formik.getFieldProps('website')}/>

            <label htmlFor="mainLink">Main Link</label>
            <input {...formik.getFieldProps('mainLink')}/>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default ProfileDataForm
