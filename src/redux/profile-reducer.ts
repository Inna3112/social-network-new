
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
type ContactsType = {
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
export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: PhotosType
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
    profile: ProfileType
}

let initialState: ProfilePageType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 15},
        {id: 2, message: 'It is my first post', likesCount: 20},
        {id: 3, message: 'Hello', likesCount: 1}
    ],
    newPostText: '',
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
    }
}
type ActionType = ReturnType<typeof addPost>
    | ReturnType<typeof updateNewPostText>
    | ReturnType<typeof setUserProfile>

const profileReducer = (state = initialState, action: ActionType): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost: PostsType = {
                id: 4,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case 'SET-USER-PROFILE': {
            return {
                ...state,
                profile: action.profile,
            }

        }
        default:
            return state
    }
}

export let addPost = () => ({type: 'ADD-POST'}) as const
export let setUserProfile = (profile: ProfileType) => ({type: 'SET-USER-PROFILE', profile}) as const
export let updateNewPostText = (newText: string) =>
    ({type: 'UPDATE-NEW-POST-TEXT', newText: newText}) as const

export default profileReducer