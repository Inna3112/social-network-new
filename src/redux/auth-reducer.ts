import {AppThunk} from './redux-store';
import {authAPI, GetMeResponseType, ResponseType, securityAPI} from '../api/api';
import {FormAction, stopSubmit} from 'redux-form';
import {call, put} from 'redux-saga/effects';


let initialState: AuthStateType = {
    userId: null,
    email: '',
    login: '',
    rememberMe: false,
    isAuth: false,
    captchaUrl: ''
}

const authReducer = (state = initialState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case 'samurai-network/auth/GET-CAPTCHA-URL-SUCCESS':
        case 'samurai-network/auth/SET-AUTH-USER-DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
//actions
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'samurai-network/auth/SET-AUTH-USER-DATA',
    payload: {
        userId: userId,
        email: email,
        login: login,
        isAuth: isAuth,
    },
}) as const
export const getCaptchaUrlSuccess = (captchaUrl: string | null) => ({
    type: 'samurai-network/auth/GET-CAPTCHA-URL-SUCCESS',
    payload: {captchaUrl}
}) as const
//sagas
export function* getMeSaga () {
        const data: ResponseType<GetMeResponseType> = yield call(authAPI.getMe)
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            yield put(setAuthUserData(id, email, login, true))
        }
}
export const getMeAC = () => ({type: 'samurai-network/auth/GET-ME'})

// thunks
export const getMe = (): AppThunk => {
    return async (dispatch, getState) => {
        const data = await authAPI.getMe()
        if (data.resultCode === 0) {
            let {id, email, login} = data.data
            dispatch(setAuthUserData(id, email, login, true))
        }
    }
}

export const logIn = (email: string | null, password: string | null, rememberMe: boolean, captcha: string): AppThunk => {
    return async (dispatch, getState) => {
        let response = await authAPI.logIn(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(getMe())
        } else {
            if(response.data.resultCode === 10){
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 1 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }
}
export const logout = (): AppThunk => {
    return async (dispatch, getState) => {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}
export const getCaptchaUrl = (): AppThunk => {
    return async (dispatch) => {
        let response = await  securityAPI.getCaptchaUrl()
        dispatch(getCaptchaUrlSuccess(response.data.url))
    }
}


export default authReducer

//types
export type AuthStateType = {
    userId: number | null
    email: string | null
    login: string | null
    captchaUrl: string
    rememberMe: boolean
    isAuth: boolean

}
export type AuthActionType = ReturnType<typeof setAuthUserData>
    | ReturnType<typeof getCaptchaUrlSuccess>
    | FormAction