import appReducer, {appStateType, initializedSuccess} from './app-reducer';

let initialState: appStateType = {initialized: false}

beforeEach(() => {
    initialState = {
        initialized: false
    }
})

test('app should be correct initialized', () => {

    const action = initializedSuccess()
    const endState = appReducer(initialState, action)

    expect(endState.initialized).toBe(true)

})
