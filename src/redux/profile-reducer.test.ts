import profileReducer, {
    addPost, deletePost,
    PostsType,
    ProfilePageType,
    ProfileType,
    setStatus,
    setUserProfile, toggleEditMode
} from './profile-reducer';

let startState: ProfilePageType

beforeEach(() => {
    startState = {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 15},
            {id: 2, message: 'It is my first post', likesCount: 20},
            {id: 3, message: 'Hello', likesCount: 1}
        ],
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
        status: 'Some status',
        editMode: false,
    }
})

test('correct post should be added', () => {

    let newPostText = 'Hello'
    let action = addPost(newPostText)
    const newPost: PostsType = {
        id: 4,
        message: action.newPostText,
        likesCount: 0
    }
    let endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(4)
    expect(endState.posts[3].id).toBe(4)
    expect(endState.posts[3].message).toBe('Hello')
    expect(startState.posts.length).toBe(3)
})

test('correct user profile should be set', () => {

    let userProfile: ProfileType = {
        aboutMe: 'I am developer',
            userId: 1234,
            lookingForAJob: true,
            lookingForAJobDescription: 'Front-end developer',
            fullName: 'Inna Fomichova',
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

    let action = setUserProfile(userProfile)
    let endState = profileReducer(startState, action)

    expect(endState.profile.fullName).toBe("Inna Fomichova")
    expect(startState.profile.photos).toBeDefined()
    expect(startState.profile.contacts).toBeDefined()
})

test('correct user status should be set', () => {

    let userStatus = 'I am front-end developer)))'

    let action = setStatus(userStatus)
    let endState = profileReducer(startState, action)

    expect(endState.status).toBe("I am front-end developer)))")

})

test('post should be deleted', () => {

    let postId = 1
    let action = deletePost(postId)
    let endState = profileReducer(startState, action)

    expect(endState.posts.length).toBe(2)
    expect(endState.posts[0].id).toBe(2)

})
test('profile mode should be correct toggled', () => {

    let action = toggleEditMode(true)
    let endState = profileReducer(startState, action)

    expect(endState.editMode).toBe(true)
})