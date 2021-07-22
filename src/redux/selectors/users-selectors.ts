import {AppStateType} from "../redux-store";
import {UsersType} from "../users-reducer";
import {createSelector} from "reselect";

//Простой селектор, нужен для использования в сложном селекторе. Для того, что бы
// сложному был доступен массив users. Используется первым входящем параметром в сложном
// селекторе.

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users
}
//Селектор, созданный при помощи библиотеки Reselect, в котором будут применены какие-то
// сложные вычисления.
export const getUsers = createSelector(getUsersSelector,
(users: Array<UsersType>) => {
    return users.filter(u => true)
})
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}