import React from 'react';
import {UsersType} from '../../redux/users-reducer';
import Paginator from '../../common/Paginator/Paginator';
import User from './User/User';


type PropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    followingInProgress: number[]
    follow: (userId: number) => void
    unFollow: (userId: number) => void
}

let Users: React.FC<PropsType> = (props) => {

    let {
        users,
        pageSize,
        totalUsersCount,
        currentPage,
        onPageChanged,
        followingInProgress,
        follow,
        unFollow
    } = props

    return <div>

        <Paginator pageSize={pageSize} totalItemsCount={totalUsersCount} currentPage={currentPage}
                   onPageChanged={onPageChanged} />
        <div>
            {users.map(u => <User key={u.id}
                                  user={u}
                                  follow={follow}
                                  unFollow={unFollow}
                                  followingInProgress={followingInProgress}/>
            )}
        </div>
    </div>
}

export default Users