import  {addPost} from './profile-reducer';
import { addMessageAC } from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import {follow, unFollow} from './users-reducer';


 type DialogsType = {
    id: number
    name: string
}
 type MessagesType = {
    id: number
    message: string
}
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
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}
export type SidebarType = {}
 type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
}
type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
    profile: ProfileType
}
export type RootStateType = {
    dialogsPage: DialogsPageType
    profilePage: ProfilePageType
    sidebar: SidebarType
}
export type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionType) => void
}

export type ActionType = ReturnType<typeof addPost> 
    | ReturnType<typeof addMessageAC>
    | ReturnType<typeof follow> | ReturnType<typeof unFollow>

export const store: StoreType = {
    _state: {
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Anna'},
                {id: 2, name: 'Sasha'},
                {id: 3, name: 'Ruslan'}
            ],
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'I am happy'},
                {id: 3, message: 'Yo'}
            ],
            newMessageBody: ''
        },
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 15},
                {id: 2, message: 'It is my first post', likesCount: 20},
                {id: 3, message: 'Hello', likesCount: 1}
            ],
            newPostText: '',
            profile: {
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
                    small: null,
                    large: null
                },
            }
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed')
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        // this._state.profilePage = profileReducer(this._state.profilePage, action);
        // this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.profilePage, action);

        this._callSubscriber()
    }
}

// @ts-ignore
window.state = state

