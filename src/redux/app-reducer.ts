import {getMeAC} from './auth-reducer'
import {all, put} from 'redux-saga/effects'
import {GetMeResponseType, ResponseType} from "../api/api";


const appReducer = (state = initialState, action: AppActionType): appStateType => {
    switch (action.type) {
        case 'samurai-network/app/INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }
        case "samurai-network/app/SET-ERROR": {
            return {
                ...state,
                error: action.error
            }
        }
        default:
            return state
    }
}
//actions
export const initializedSuccess = () => ({type: 'samurai-network/app/INITIALIZED-SUCCESS'}) as const
export const setError = (error: string | null) => ({type: 'samurai-network/app/SET-ERROR', error}) as const

//sagas
export function* initializeAppSaga() {
    const dispatchResult: ResponseType<GetMeResponseType> = yield put(getMeAC())
    yield all([dispatchResult])
    yield put(initializedSuccess())
}

export const initializeAppAC = () => ({type: 'samurai-network/app/INITIALIZE-APP'})

//thunks

// export const initializeApp = (): ThunkAction<void, AppStateType, unknown, AppActionType> => {
//     return (dispatch, getState) => {
//         const dispatchResult = dispatch(getMe())
//         Promise.all([dispatchResult])
//             .then(() => {
//                 dispatch(initializedSuccess())
//             })
//     }
// }
// export const initializeApp = (): ThunkAction<void, AppStateType, unknown, AppActionType> => {
//     return async (dispatch, getState) => {
//         const dispatchResult = dispatch(getMe())
//         await Promise.all([dispatchResult])
//         dispatch(initializedSuccess())
//     }
// }


export default appReducer

//types
export type appStateType = {
    initialized: boolean
    error: string | null
}
export type AppActionType = ReturnType<typeof initializedSuccess>
    | ReturnType<typeof setError>

let initialState: appStateType = {
    initialized: false,
    error: null
}