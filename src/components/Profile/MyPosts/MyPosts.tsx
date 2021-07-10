import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { PostsType} from '../../../redux/store';
import {PostsReduxForm} from './Post/PostForm/PostsForm';


type PropsType = {
    posts: Array<PostsType>
    // newPostText: string
    // updateNewPostText: (text: string) => void
    addPost:(newPostText: string) => void

}


const MyPosts: React.FC<PropsType> = (props) => {
    let postsElement = props.posts
        .map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

    // let addPost = () => {
    //     props.addPost()
    // }
    //
    // let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //     props.updateNewPostText(e.currentTarget.value)
    // }
    const addNewPost = (values: {newPostText: string}) => {
        props.addPost(values.newPostText)
    }
    return (
        <div className={s.myPosts}>
            <h3>My posts</h3>
            <div>
                <PostsReduxForm onSubmit={addNewPost}/>
                <div className={s.posts}>
                    {postsElement}
                </div>
            </div>
        </div>
    )
}


export default MyPosts;