import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {getMe} from './auth-reducer';


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
export const initializedSuccess = () => ({
        type: 'samurai-network/app/INITIALIZED-SUCCESS'
    }
) as const
export const setError = (error: string | null) => ({
        type: 'samurai-network/app/SET-ERROR', error
    }
) as const

export const initializeApp = (): ThunkAction<void, AppStateType, unknown, AppActionType> => {
    return (dispatch, getState) => {
        let dispatchResult = dispatch(getMe())
        Promise.all([dispatchResult])
            .then(() => {
                dispatch(initializedSuccess())
            })
    }
}


export default appReducer