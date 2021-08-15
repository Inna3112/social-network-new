import authReducer, {AuthStateType, setAuthUserData} from './auth-reducer';


let initialState: AuthStateType = {
    userId: null,
    email: '',
    login: '',
    rememberMe: false,
    isAuth: false,
}

beforeEach(() => {
    let initialState: AuthStateType = {
        userId: null,
        email: '',
        login: '',
        rememberMe: false,
        isAuth: false,
    }
})

test('app should be correct initialized', () => {

    const action = setAuthUserData(5, 'innula3112@gmail.com', 'innula3112', true)
    const endState = authReducer(initialState, action)

    expect(endState.userId).toBe(5)
    expect(endState.email).toBe('innula3112@gmail.com')
    expect(endState.login).toBe('innula3112')

})
