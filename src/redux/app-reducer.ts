import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './redux-store';
import {getMe} from './auth-reducer';


export type appStateType = {
    initialized: boolean
}
export type AppActionType = ReturnType<typeof initializedSuccess>

let initialState: appStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: AppActionType): appStateType => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}
export const initializedSuccess = () => ({
        type: 'INITIALIZED-SUCCESS'
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