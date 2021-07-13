import {applyMiddleware, combineReducers, createStore} from 'redux';
import sidebarReducer from './sidebar-reducer';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'



type RootReducerType = typeof rootReducer //(appState: globalStateType) => appState
export type AppStateType = ReturnType<RootReducerType>
// export type AllActionsType =
//     authActionTypes
//     | userActionsType
//     | dialogsActionsType
//     | profileActionsType
//     | FormAction
//     | appActionTypes
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AllActionsType>


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
})


export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store
