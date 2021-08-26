import {AppThunk} from './redux-store';
import {authAPI} from '../api/api';
import {FormAction, stopSubmit} from 'redux-form';


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
        case 'samurai-network/auth/SET-AUTH-USER-DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export let setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'samurai-network/auth/SET-AUTH-USER-DATA',
    payload: {
        userId: userId,
        email: email,
        login: login,
        isAuth: isAuth,
    },
}) as const

export const getMe = (): AppThunk => {
    return async (dispatch, getState) => {
        const data = await authAPI.getMe()
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}

export const logIn = (email: string | null, password: string | null, rememberMe: boolean): AppThunk => {
    return async (dispatch, getState) => {
        const response = await authAPI.logIn(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getMe())
        } else {
            let message = response.data.messages.length > 1 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }
}
export const logout = (): AppThunk => {
    return async (dispatch, getState) => {
        const response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}


export default authReducer