import React from 'react';
import {UsersType} from '../../redux/users-reducer';
import s from './Users.module.css'
import avaPost from './../../assets/images/avaPost.png'
import {NavLink} from 'react-router-dom';
import Paginator from "./Paginator/Paginator";


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

let Users: React.FC <PropsType> = (props) => {

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

        <Paginator pageSize={pageSize} totalUsersCount={totalUsersCount} currentPage={currentPage} onPageChanged={onPageChanged} />

        {users.map(u => {

            const onClickFollowHandler = () => {
                follow(u.id)
            }
            const onClickUnFollowHandler = () => {
                unFollow(u.id)
            }

            return <div key={u.id} className={s.user}>
                <div className={s.followingBlock}>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small ? u.photos.small : avaPost}
                                  alt={'Users photo'} className={s.img} />
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={onClickUnFollowHandler} className={s.button}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === u.id)} onClick={onClickFollowHandler} className={s.button}>Follow</button>}
                    </div>
                </div>
                <div className={s.content}>
                    <div className={s.nameAndStatus}>
                        <div className={s.name}>{u.name}</div>
                        <div className={s.status}>{u.status}</div>
                    </div>
                    <div className={s.location}>
                        <div className={s.country}>{'u.location.country'}</div>
                        <div className={s.city}>{'u.location.city'}</div>
                    </div>
                </div>
            </div>
        })}
    </div>
}

export default Users