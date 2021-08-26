
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
}
export type DialogActionType = ReturnType<typeof addMessageAC>

const dialogsReducer = (state = initialState, action: DialogActionType): DialogsPageType => {
    switch (action.type) {
        case 'samurai-network/dialogsPage/ADD-MESSAGE':
            const newMessage: MessagesType = {
                id: 4,
                message: action.newMessageBody
            }
            return {...state,
                messages: [...state.messages, newMessage],
            }
        default:
            return state
    }
}
export let addMessageAC = (newMessageBody: string) => ({type: 'samurai-network/dialogsPage/ADD-MESSAGE', newMessageBody}) as const


export default dialogsReducer