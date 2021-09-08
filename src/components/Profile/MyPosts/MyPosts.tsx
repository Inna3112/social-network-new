import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { PostsType} from '../../../redux/store';
import {PostsFormWithFormik} from './Post/PostForm/PostFormWithFormik';


type PropsType = {
    posts: Array<PostsType>
    // newPostText: string
    // updateNewPostText: (text: string) => void
    addPost:(newPostText: string) => void

}


const MyPosts: React.FC<PropsType> = React.memo(({posts, addPost}) => {
    let postsElement = posts
        .map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

    // let addPost = () => {
    //     props.addPost()
    // }
    //
    // let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     props.updateNewPostText(e.currentTarget.value)
    // }
    const addNewPost = (values: {newPostText: string}) => {
        addPost(values.newPostText)
        values.newPostText = ''
    }
    return (
        <div className={s.myPosts}>
            <h3>My posts</h3>
            <div>
                <PostsFormWithFormik />
                <div className={s.posts}>
                    {postsElement}
                </div>
            </div>
        </div>
    )
})


export default MyPosts;