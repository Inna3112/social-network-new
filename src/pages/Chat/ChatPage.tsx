import React, {useEffect, useState} from 'react'

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat = () => {

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}
const Messages = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener('message', (e) => {
            // console.log(JSON.parse(e.data))
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [])

    return (
        <div style={{height: 400, overflowY: 'auto'}}>
            {messages.map((m:ChatMessageType, index) => <Message key={index} message={m} />)}
        </div>
    )
}
type MessagePropsType = {
    message: ChatMessageType
}
const Message: React.FC<MessagePropsType> = ({message}) => {

    return (
        <div>
            <img style={{width: 50, height: 50}} src={message.photo} alt="ava"/>
            <b>{message.userName}</b>
            <div>
                {message.message}
            </div>
            <hr/>
        </div>
    )
}
const AddMessageForm = () => {
    return (
        <div>
            <div>
                <textarea/>
            </div>
            <div>
                <button>send</button>
            </div>
        </div>
    )
}

export default ChatPage
