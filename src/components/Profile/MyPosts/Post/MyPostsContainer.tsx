import React from 'react';
import MyPosts from '../MyPosts';
import {PostsType} from '../../../../redux/store';
import {addPost} from '../../../../redux/profile-reducer';
import {connect} from 'react-redux';
import {AppStateType} from '../../../../redux/redux-store';

type MapStatePropsType = {
    posts: Array<PostsType>
    // newPostText: string
}
type MapDispatchPropsType = {
    addPost: (newPostText: string) => void,
    // updateNewPostText: (text: string) => void
}
type OwnType = {
    // props, которые приходят через атрибуты, а не через connect,
    // если такие есть
}
// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        // newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
    return {
        addPost: (newPostText) => dispatch(addPost(newPostText)),
        // updateNewPostText: (text: string) => dispatch(updateNewPostText(text))
    }
}

const MyPostsContainer =
    connect<MapStatePropsType, MapDispatchPropsType, OwnType, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;