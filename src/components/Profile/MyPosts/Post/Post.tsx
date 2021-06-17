import React from 'react';
import s from './Post.module.css';
import ava from "../../../../assets/images/avaPost.png";

type PropsType = {
    id: number
    message: string
    likesCount: number
}
const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={s.item}>
            <img src={ava}/>
            {props.message}
            <div><span>{props.likesCount}</span></div>
        </div>

    )
}

export default Post;