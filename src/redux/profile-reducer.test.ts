

import profileReducer, {addPost, PostsType, ProfilePageType, updateNewPostText} from "./profile-reducer";

test('correct post should be added', () => {
    let startState: ProfilePageType = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 15},
            {id: 2, message: 'It is my first post', likesCount: 20},
            {id: 3, message: 'Hello', likesCount: 1}
        ],
        newPostText: '',
        profile: {
            aboutMe: '',
            userId: 0,
            lookingForAJob: false,
            lookingForAJobDescription: '',
            fullName: '',
            contacts: {
                github: '',
                vk: '',
                facebook: '',
                instagram: '',
                twitter: '',
                website: '',
                youtube: '',
                mainLink: '',
            },
            photos: {
                small: undefined,
                large: undefined,
            },
        },
    }
    const newPost: PostsType = {
        id: 4,
        message: startState.newPostText,
        likesCount: 0
    }
    let action = addPost()
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
        newPostText: '',
        profile: {
            aboutMe: '',
            userId: 0,
            lookingForAJob: false,
            lookingForAJobDescription: '',
            fullName: '',
            contacts: {
                github: '',
                vk: '',
                facebook: '',
                instagram: '',
                twitter: '',
                website: '',
                youtube: '',
                mainLink: '',
            },
            photos: {
                small: undefined,
                large: undefined,
            },
        }
    }

    let newPostText = "I am happy!!!"
    let action = updateNewPostText(newPostText)
    let endState = profileReducer(startState, action)

    expect(endState.newPostText).toBe("I am happy!!!")
    expect(startState.newPostText).toBe("")
})