import {applyMiddleware, combineReducers, createStore} from 'redux';
import sidebarReducer from './sidebar-reducer';
import profileReducer, {ProfileActionType} from './profile-reducer';
import dialogsReducer, {DialogActionType} from './dialogs-reducer';
import usersReducer, {UserActionType} from './users-reducer';
import authReducer, {AuthActionType} from './auth-reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {FormAction, reducer as formReducer} from 'redux-form'
import appReducer, {AppActionType} from './app-reducer';
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects'


const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer,
})
const sagaMiddleware = createSagaMiddleware()

export let store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware))

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
    // yield all([appWatcherSaga(), tasksWatcherSaga()])
    yield all([])
}
// @ts-ignore
window.store = store

//types
type RootReducerType = typeof rootReducer //(appState: globalStateType) => appState
export type AppStateType = ReturnType<RootReducerType>
export type AllActionsType =
    AuthActionType
    | UserActionType
    | DialogActionType
    | ProfileActionType
    | AppActionType
    | FormAction

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AllActionsType>
