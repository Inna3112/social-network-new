import React, {ChangeEvent} from 'react';
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import { PostsType} from "../../../redux/store";


type PropsType = {
    posts: Array<PostsType>
    newPostText: string
    updateNewPostText: (text: string) => void
    addPost:() => void

}


const MyPosts: React.FC<PropsType> = (props) => {
    let postsElement = props.posts
        .map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

    let addPost = () => {
        props.addPost()
    }

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }
    return (
        <div className={s.myPosts}>
            <h3>My posts</h3>
            <div>
                <textarea onChange={onPostChange} value={props.newPostText}/>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
                <div className={s.posts}>
                    {postsElement}
                </div>
            </div>
        </div>
    )
}

export default MyPosts;