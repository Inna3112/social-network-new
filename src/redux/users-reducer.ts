import {usersAPI} from '../api/api';
import {AppThunk} from './redux-store';
import {Dispatch} from 'react';
import {updateObjectInArray} from '../utils/object-helpers';


let initialState: UsersStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action: UserActionType): UsersStateType => {
    switch (action.type) {
        case 'samurai-network/users-page/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
                // state.users.map(u => {
                // return u.id === action.userId ? {...u, followed: true} : u
                // })
            }
        case 'samurai-network/users-page/UNFOLLOW':
            return {
                ...state,
                users:
                    updateObjectInArray(state.users, action.userId, 'id', {followed: false})
                //     state.users.map(u => {
                //     return u.id === action.userId ? {...u, followed: false} : u
                // })
            }
        case 'samurai-network/users-page/SET-USERS':
            return {
                ...state,
                users: action.users
            }
        case 'samurai-network/users-page/SET-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'samurai-network/users-page/SET-TOTAL-USERS-COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'samurai-network/users-page/TOGGLE-IS-FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'samurai-network/users-page/TOGGLE-FOLLOWING-PROGRESS':
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

//actions
export let followSuccess = (userId: number) => ({type: 'samurai-network/users-page/FOLLOW', userId}) as const
export let unFollowSuccess = (userId: number) => ({type: 'samurai-network/users-page/UNFOLLOW', userId}) as const
export let setUsers = (users: Array<UsersType>) => ({type: 'samurai-network/users-page/SET-USERS', users}) as const
export let setCurrentPage = (currentPage: number) => ({
    type: 'samurai-network/users-page/SET-CURRENT-PAGE',
    currentPage
}) as const
export let setTotalUsersCount = (totalUsersCount: number) => ({
    type: 'samurai-network/users-page/SET-TOTAL-USERS-COUNT',
    totalUsersCount
}) as const
export let toggleIsFetching = (isFetching: boolean) => ({
    type: 'samurai-network/users-page/TOGGLE-IS-FETCHING',
    isFetching
}) as const
export let toggleFollowingProgress = (isFetching: boolean, userId: number) => ({
    type: 'samurai-network/users-page/TOGGLE-FOLLOWING-PROGRESS',
    isFetching,
    userId
}) as const

//thunks
export const requestUsers = (page: number, pageSize: number): AppThunk => {
    return async (dispatch, getState) => {

        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(page))

        let data = await usersAPI.getUsers(page, pageSize)
        // debugger
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        dispatch(setTotalUsersCount(data.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<UserActionType>, userId: number, apiMethod: any,
                                  actionCreator: typeof followSuccess | typeof unFollowSuccess) => {
    dispatch(toggleFollowingProgress(true, userId))

    let response = await apiMethod(userId)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => {
    return async (dispatch: Dispatch<UserActionType>) => {
        let apiMethod = usersAPI.followSuccess.bind(usersAPI)
        let actionCreator = followSuccess
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

export const unFollow = (userId: number) => {
    return async (dispatch: Dispatch<UserActionType>) => {
        let apiMethod = usersAPI.unFollowSuccess.bind(usersAPI)
        let actionCreator = unFollowSuccess
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)
    }
}

//types
export type LocationType = {
    city: string
    country: string
}
export type UsersType = {
    name: string
    id: number
    photos: {
        small: string | null
        large: string | null
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

export default usersReducer