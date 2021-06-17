import {DialogsPageType, MessagesType} from "./store";
import dialogsReducer, {addMessageAC, updateNewMessageBodyAC} from "./dialogs-reducer";

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
        newMessageBody: ''
    }
    const newMessage: MessagesType = {
        id: 4,
        message: startState.newMessageBody
    }

    let action = addMessageAC()
    let endState = dialogsReducer(startState, action)

    expect(endState.messages.length).toBe(4)
    expect(endState.messages[3].id).toBe(4)
    expect(endState.messages[3].message).toBe('')
    expect(startState.messages.length).toBe(3)
    expect(startState.dialogs.length).toBe(3)
})

test('correct new message body should be updated', () => {
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
        newMessageBody: ''
    }

    let newMessageBody = 'Hi!'
    let action = updateNewMessageBodyAC(newMessageBody)
    let endState = dialogsReducer(startState, action)

    expect(endState.newMessageBody).toBe('Hi!')
    expect(startState.newMessageBody).toBe('')
})