
import dialogsReducer, {addMessageAC, DialogsPageType, MessagesType} from "./dialogs-reducer";

test('correct message should be added', () => {
    let startState: DialogsPageType = {
        dialogs: [
            {id: 1, name: 'Anna'},
            {id: 2, name: 'Sasha'},
            {id: 3, name: 'Ruslan'}
        ],
        messages: [
            {id: 1, message: 'Hello'},
            {id: 2, message: 'I am happy'},
            {id: 3, message: 'Yo'}
        ],

    }

    let action = addMessageAC('Hi!')
    let endState = dialogsReducer(startState, action)

    expect(endState.messages.length).toBe(4)
    expect(endState.messages[3].id).toBe(4)
    expect(endState.messages[3].message).toBe('Hi!')
    expect(startState.messages.length).toBe(3)
    expect(startState.dialogs.length).toBe(3)
})

