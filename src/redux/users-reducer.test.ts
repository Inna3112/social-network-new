import usersReducer, {followSuccess, setUsers, unFollowSuccess, UsersStateType, UsersType} from './users-reducer';

let initialState: UsersStateType

beforeEach(() => {
    initialState = {
        users: [
            {
                id: 1,
                photos: {small: null, large: null},
                followed: true,
                name: 'Anna',
                status: 'I am happy',
                location: {city: 'Kyiv', country: 'Ukraine'}
            },
            {
                id: 2,
                photos: {small: null, large: null},
                followed: false,
                name: 'Inna',
                status: 'I am sed',
                location: {city: 'Kyiv', country: 'Ukraine'}
            },
            {
                id: 3,
                photos: {small: null, large: null},
                followed: true,
                name: 'Max',
                status: 'I am  too happy',
                location: {city: 'Kyiv', country: 'Ukraine'}
            }],
        pageSize: 1,
        totalUsersCount: 3,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [1]
    }
})

test('followed should be true', () => {

    const action = followSuccess(3)
    const endState = usersReducer(initialState, action)

    expect(endState.users[2].followed).toBeTruthy()

})

test('followed should be false', () => {

    const action = unFollowSuccess(2)
    const endState = usersReducer(initialState, action)

    expect(endState.users[1].followed).toBeFalsy()

})

test('users should be set', () => {
    let initialState = {
        users: [] as UsersType[],
        pageSize: 0,
        totalUsersCount: 0,
        currentPage: 0,
        isFetching: false,
        followingInProgress: [0]}

    const newUsers = [
        {
            id: 4,
            photos: {small: null, large: null},
            followed: false,
            name: 'Alex',
            status: 'I.....',
            location: {
                city: 'Berlin',
                country: 'Germany'
            }
        }
    ]
    const action = setUsers(newUsers)
    const endState = usersReducer(initialState, action)

    expect(endState.users.length).toBe(1)
    expect(endState.users[0].id).toBe(4)

})