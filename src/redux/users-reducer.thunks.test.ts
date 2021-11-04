import {follow} from './users-reducer';
import {ResponseType, usersAPI} from '../api/api';

//нужно создать фейковую API, чтобы не делать запрос на настоящий сервер
jest.mock('../api/api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

//нам нужна фейковая функция для диспатча
const dispatchMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    usersAPIMock.followSuccess.mockClear()
})

const result: ResponseType<{}> = {
    resultCode: 0,
    fieldsErrors: [],
    messages: [],
    data: {}
}

usersAPIMock.followSuccess.mockReturnValue(Promise.resolve(result))

test('success follow thunk', async () => {
    //чтобы получить санку - нужно вызвать санк креейтор
    const thunk = follow(1)

    //чтобы протестировать санку - ее нужно сначала вызвать
    await thunk(dispatchMock)
    //ожидаем, что диспатч произошел 3 раза, потому что в санке 3 раза вызван диспатч
    expect(dispatchMock).toBeCalledTimes(3)
    // expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, 1))
    // expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccess(1))
    // expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, 1))
})