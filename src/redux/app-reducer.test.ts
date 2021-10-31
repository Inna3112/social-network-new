import appReducer, {appStateType, initializedSuccess, setError} from './app-reducer';

let initialState: appStateType = {initialized: false, error: null}

beforeEach(() => {
    initialState = {
        initialized: false,
        error: null
    }
})

test('app should be correct initialized', () => {

    const action = initializedSuccess()
    const endState = appReducer(initialState, action)

    expect(endState.initialized).toBe(true)

})
test('error should be correct set', () => {

    const action = setError('some error')
    const endState = appReducer(initialState, action)

    expect(endState.error).toBe('some error')

})
