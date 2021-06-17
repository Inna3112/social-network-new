import avaPost from "../assets/images/avaPost.png";
import usersReducer, {followAC, setUsersAC, unFollowAC, UsersStateType} from "./users-reducer";

let initialState: UsersStateType = {users: []}

beforeEach(() => {
    initialState = {
        users: [
            {
                id: 1,
                photoUrl: avaPost,
                followed: true,
                name: 'Anna',
                status: 'I am happy',
                location: {city: 'Kyiv', country: 'Ukraine'}
            },
            {
                id: 2,
                photoUrl: avaPost,
                followed: false,
                name: 'Inna',
                status: 'I am sed',
                location: {city: 'Kyiv', country: 'Ukraine'}
            },
            {
                id: 3,
                photoUrl: avaPost,
                followed: true,
                name: 'Max',
                status: 'I am  too happy',
                location: {city: 'Kyiv', country: 'Ukraine'}
            }]
    }
})

test('followed should be true', () => {

    const action = followAC(3)
    const endState = usersReducer(initialState, action)

    expect(endState.users[2].followed).toBe(true)

})

test('followed should be false', () => {

    const action = unFollowAC(2)
    const endState = usersReducer(initialState, action)

    expect(endState.users[1].followed).toBe(false)

})

test('users should be set', () => {
    const newUsers = [
        {
            id: 4,
            photoUrl: avaPost,
            followed: false,
            name: 'Alex',
            status: 'I.....',
            location: {
                city: 'Berlin',
                country: 'Germany'
            }
        }
    ]
    const action = setUsersAC(newUsers)
    const endState = usersReducer(initialState, action)

    expect(endState.users.length).toBe(4)
    expect(endState.users[3].id).toBe(4)

})