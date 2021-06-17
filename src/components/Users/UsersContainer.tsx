import React from 'react';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, toggleFollowingProgress, toggleIsFetching,
    unFollow, getUsersThunkCreator,
    UsersStateType,
    UsersType
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import {usersAPI} from '../../api/api';

type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersThunkCreator(currentPage, pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   follow={this.props.follow}
                   unFollow={this.props.unFollow}
                   users={this.props.users}
                   followingInProgress={this.props.followingInProgress}
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
            />
        </>
    }
}

const mapStateToProps = (state: AppStateType): UsersStateType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         follow: (userId: number) => dispatch(followAC(userId)),
//         unFollow: (userId: number) => dispatch(unFollowAC(userId)),
//         setUsers: (users: Array<UsersType>) => dispatch(setUsersAC(users)),
//         setCurrentPage: (pageNumber: number) => dispatch(setCurrentPageAC(pageNumber)),
//         setTotalUsersCount: (totalUsersCount: number) => dispatch(setTotalUsersCountAC(totalUsersCount)),
//         toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetchingAC(isFetching)),
//     }
// }


export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    follow, unFollow, setUsers, setCurrentPage, setTotalUsersCount,
    toggleIsFetching, toggleFollowingProgress, getUsersThunkCreator
})(UsersContainer)

