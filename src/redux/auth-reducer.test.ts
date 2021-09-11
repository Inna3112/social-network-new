import authReducer, {AuthStateType, getCaptchaUrlSuccess, setAuthUserData} from './auth-reducer';


let initialState: AuthStateType

beforeEach(() => {
     initialState = {
        userId: null,
        email: '',
        login: '',
        rememberMe: false,
        isAuth: false,
        captchaUrl: '',
    }
})

test('app should be correct initialized', () => {

    const action = setAuthUserData(5, 'innula3112@gmail.com', 'innula3112', true)
    const endState = authReducer(initialState, action)

    expect(endState.userId).toBe(5)
    expect(endState.email).toBe('innula3112@gmail.com')
    expect(endState.login).toBe('innula3112')

})
test('captcha url should be correct added', () => {

    const action = getCaptchaUrlSuccess('www.https//:captcha.com')
    const endState = authReducer(initialState, action)

    expect(endState.captchaUrl).toBe('www.https//:captcha.com')
})
