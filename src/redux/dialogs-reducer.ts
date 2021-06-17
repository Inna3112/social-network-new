
export type DialogsType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
}

let initialState: DialogsPageType = {
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
type ActionType = ReturnType<typeof addMessageAC> | ReturnType<typeof updateNewMessageBodyAC>

const dialogsReducer = (state = initialState, action: ActionType): DialogsPageType => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            const newMessage: MessagesType = {
                id: 4,
                message: state.newMessageBody
            }
            return {...state,
                newMessageBody: state.newMessageBody = '',
                messages: [...state.messages, newMessage],
            }
        case 'UPDATE-NEW-MESSAGE-BODY':
            return {...state,
                newMessageBody: action.newMessageBody}
        default:  return state
    }
}
export let addMessageAC = () => ({type: 'ADD-MESSAGE'}) as const

export let updateNewMessageBodyAC = (body: string) =>
    ({type: 'UPDATE-NEW-MESSAGE-BODY', newMessageBody: body}) as const

export default dialogsReducer