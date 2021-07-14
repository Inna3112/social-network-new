import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";


export type AuthStateType = {
    userId: number | null
    email: string | null
    login: string | null
    rememberMe: boolean
    isAuth: boolean
}
export type AuthActionType = ReturnType<typeof setAuthUserData> | FormAction

let initialState: AuthStateType = {
    userId: null,
    email: '',
    login: '',
    rememberMe: false,
    isAuth: false,
}

const authReducer = (state = initialState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case 'SET-AUTH-USER-DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export let setAuthUserData = (userId: number | null, email: string | null, login: string | null,  isAuth: boolean) => ({
    type: 'SET-AUTH-USER-DATA',
    payload: {
        userId: userId,
        email: email,
        login: login,
        isAuth: isAuth,
    },
}) as const

export const getMe = (): ThunkAction<void, AppStateType, unknown, AuthActionType> => {
    return (dispatch, getState) => {
        authAPI.getMe()
            .then(data => {
            if(data.resultCode === 0){
                let {id, email, login}  = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        })
    }
}

export const logIn = (email: string | null, password: string | null, rememberMe: boolean): ThunkAction<void, AppStateType, unknown, AuthActionType> => {
    return (dispatch, getState) => {
        authAPI.logIn(email, password, rememberMe)
            .then(response => {
                if(response.data.resultCode === 0){
                    dispatch(getMe())
                } else {
                    let message = response.data.messages.length > 1 ? response.data.messages[0] : 'Some error'
                    dispatch(stopSubmit('login', {_error: message}))
                }
            })
    }
}
export const logout = (): ThunkAction<void, AppStateType, unknown, AuthActionType> => {
    return (dispatch, getState) => {
        authAPI.logout()
            .then(response => {
                if(response.data.resultCode === 0){
                    dispatch(setAuthUserData(null, null, null, false))
                }
            })
    }
}


export default authReducer