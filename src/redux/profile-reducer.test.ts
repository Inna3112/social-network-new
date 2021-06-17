import {PostsType, ProfilePageType} from "./store";
import profileReducer, {addPostAC, updateNewPostTextAC} from "./profile-reducer";

test('correct post should be added', () => {
    let startState: ProfilePageType = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 15},
            {id: 2, message: 'It is my first post', likesCount: 20},
            {id: 3, message: 'Hello', likesCount: 1}
        ],
        newPostText: ''
    }
    const newPost: PostsType = {
        id: 4,
        message: startState.newPostText,
        likesCount: 0
    }
    let action = addPostAC()
    let endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(4)
    expect(endState.posts[3].id).toBe(4)
    expect(endState.posts[3].message).toBe('')
    expect(startState.posts.length).toBe(3)
})

test('correct new post message should be updated', () => {
    let startState: ProfilePageType = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 15},
            {id: 2, message: 'It is my first post', likesCount: 20},
            {id: 3, message: 'Hello', likesCount: 1}
        ],
        newPostText: ''
    }

    let newPostText = "I am happy!!!"
    let action = updateNewPostTextAC(newPostText)
    let endState = profileReducer(startState, action)

    expect(endState.newPostText).toBe("I am happy!!!")
    expect(startState.newPostText).toBe("")
})