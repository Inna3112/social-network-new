import React from 'react';
import s from './User.module.css'
import avaPost from './../../../assets/images/avaPost.png'
import {NavLink} from 'react-router-dom';
import {UsersType} from '../../../redux/users-reducer';

type PropsType = {
    user: UsersType
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    followingInProgress: number[]
}

let User: React.FC <PropsType> = ({user, follow, unFollow, followingInProgress}) => {

            const onClickFollowHandler = () => follow(user.id)
            const onClickUnFollowHandler = () => unFollow(user.id)

            return <div className={s.user}>
                <div className={s.followingBlock}>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small ? user.photos.small : avaPost}
                                  alt={'Users photo'} className={s.img} />
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={onClickUnFollowHandler} className={s.button}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={onClickFollowHandler} className={s.button}>Follow</button>}
                    </div>
                </div>
                <div className={s.content}>
                    <div className={s.nameAndStatus}>
                        <div className={s.name}>{user.name}</div>
                        <div className={s.status}>{user.status}</div>
                    </div>
                    <div className={s.location}>
                        <div className={s.country}>{'u.location.country'}</div>
                        <div className={s.city}>{'u.location.city'}</div>
                    </div>
                </div>
            </div>
        }

export default User