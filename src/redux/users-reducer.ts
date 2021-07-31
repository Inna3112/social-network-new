import {usersAPI} from '../api/api';
import {ThunkAction} from 'redux-thunk';
import {AppStateType, AppThunk} from './redux-store';
import {Dispatch} from 'react';

export type LocationType = {
    city: string
    country: string
}
export type UsersType = {
    name: string
    id: number
    photos: {
        small: string
        large: string
    },
    status: string | null,
    followed: boolean
    location: LocationType
}
export type UsersStateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
export type UserActionType = ReturnType<typeof followSuccess>
    | ReturnType<typeof unFollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>

let initialState: UsersStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action: UserActionType): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    return u.id === action.userId ? {...u, followed: true} : u
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    return u.id === action.userId ? {...u, followed: false} : u
                })
            }
        case 'SET-USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET-TOTAL-USERS-COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'TOGGLE-IS-FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE-FOLLOWING-PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state
    }
}
export let followSuccess = (userId: number) => ({type: 'FOLLOW', userId}) as const
export let unFollowSuccess = (userId: number) => ({type: 'UNFOLLOW', userId}) as const
export let setUsers = (users: Array<UsersType>) => ({type: 'SET-USERS', users}) as const
export let setCurrentPage = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage}) as const
export let setTotalUsersCount = (totalUsersCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', totalUsersCount}) as const
export let toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching}) as const
export let toggleFollowingProgress = (isFetching: boolean, userId: number) => ({type: 'TOGGLE-FOLLOWING-PROGRESS', isFetching, userId}) as const

export const requestUsers = (page: number, pageSize: number): AppThunk => {
    return (dispatch, getState) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))
        usersAPI.getUsers(page, pageSize)
            .then(data => {
            // debugger
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        })
    }
}

export const follow = (userId: number) => {
    return (dispatch: Dispatch<UserActionType>) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.followSuccess(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}

export const unFollow = (userId: number) => {
    return (dispatch: Dispatch<UserActionType>) => {
        dispatch(toggleFollowingProgress(true, userId))
        usersAPI.unFollowSuccess(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unFollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}

export default usersReducer