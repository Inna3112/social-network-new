import {AppThunk} from './redux-store';
import {profileAPI, usersAPI} from '../api/api';
import {setError} from './app-reducer';


export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | undefined
    large: string | undefined
}
export type ProfileType = ProfileDataType & {
    photos: PhotosType
}
export type ProfileDataType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number | null
}
export type ProfilePageType = {
    posts: Array<PostsType>
    profile: ProfileType
    status: string
    editMode: boolean
}

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It is my first post', likesCount: 20},
        {id: 3, message: 'Hello', likesCount: 1}
    ],
    profile: {
        aboutMe: '',
        userId: 0,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        fullName: '',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        },
        photos: {
            small: undefined,
            large: undefined,
        },
    },
    status: '',
    editMode: false
}
export type ProfileActionType = ReturnType<typeof addPost>
    | ReturnType<typeof deletePost>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof toggleEditMode>

const profileReducer = (state = initialState, action: ProfileActionType): ProfilePageType => {
    switch (action.type) {
        case 'samurai-network/profile-page/ADD-POST': {
            const newPost: PostsType = {
                id: 4,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                // newPostText: ''
            }
        }
        case "samurai-network/profile-page/DELETE-POST": {
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }
        }
        case 'samurai-network/profile-page/SET-USER-PROFILE': {
            return {
                ...state,
                profile: action.profile,
            }

        }
        case 'samurai-network/profile-page/SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case "samurai-network/profile-page/SAVE-PHOTO": {
            return {
                ...state,
                profile: {...state.profile, photos: action.file}
            }
        }
        case "samurai-network/profile-page/TOGGLE-EDIT-MODE": {
            return {
                ...state,
                editMode: action.mode
            }
        }
        default:
            return state
    }
}

export const addPost = (newPostText: string) => ({type: 'samurai-network/profile-page/ADD-POST', newPostText}) as const
export const deletePost = (id: number) => ({type: 'samurai-network/profile-page/DELETE-POST', id}) as const
export const setUserProfile = (profile: ProfileType) => ({
    type: 'samurai-network/profile-page/SET-USER-PROFILE',
    profile
}) as const
export const setStatus = (status: string) => ({type: 'samurai-network/profile-page/SET-STATUS', status}) as const
export const savePhotoSuccess = (file: any) => ({type: 'samurai-network/profile-page/SAVE-PHOTO', file}) as const
export const toggleEditMode = (mode: boolean) => ({type: 'samurai-network/profile-page/TOGGLE-EDIT-MODE', mode}) as const

export const getProfile = (userId: number | null): AppThunk => {
    return async (dispatch, getState) => {
        let response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}
export const getStatus = (userId: number | null): AppThunk => {
    return async (dispatch, getState) => {
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data))
    }
}
export const updateStatus = (status: string): AppThunk => {
    return async (dispatch, getState) => {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    }
}
export const savePhoto = (file: any): AppThunk => {
    return async (dispatch) => {
        let response = await profileAPI.savaPhoto(file)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos))
        }
    }
}
export const setProfileData = (profileData: ProfileDataType): AppThunk => {
    return async (dispatch, getState) => {
        const userId = getState().profilePage.profile.userId
        let response = await profileAPI.setProfileData(profileData)
        if (response.data.resultCode === 0) {
            dispatch(getProfile(userId))
            dispatch(toggleEditMode(false))
        } else {
            dispatch(setError(response.data.messages.length ? response.data.messages[0] : 'Some error'))
            dispatch(toggleEditMode(true))
        }
    }
}


export default profileReducer