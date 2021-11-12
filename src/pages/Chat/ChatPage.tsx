import React, {useEffect, useState} from 'react'

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}
//ws могут отдавать только текстовые и бинарные данные, поэтому их НУЖНО ПАРСИТЬ В json!!!!

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat = () => {
const [ws, setWs] = useState<WebSocket | null>(null)
    useEffect(() => {
        function createChannel (){
            setWs(new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'))
        }
        createChannel()
    }, [])

    useEffect(() => {
        ws?.addEventListener('close', () => {
            console.log('CLOSE WS')
        })
    }, [ws])

    return (
        <div>
            <Messages ws={ws} />
            <AddMessageForm ws={ws}/>
        </div>
    )
}
const Messages: React.FC<{ws: WebSocket | null}> = ({ws}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws?.addEventListener('message', (e) => {
            // console.log(JSON.parse(e.data))
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [ws])

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
const AddMessageForm: React.FC<{ws: WebSocket | null}> = ({ws}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'open'>('pending')

    useEffect(() => {
       ws?.addEventListener('open', () => {
           setReadyStatus('open')
       })
    }, [ws])

    const addMessage = () => {
        ws?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
            </div>
            <div>
                {/*<button disabled={ws.readyState !== WebSocket.OPEN} onClick={addMessage}>send</button>*/}
                {/*дизэйблим кнопку пока не подключится ws канал*/}
                <button disabled={ws === null || readyStatus === 'pending'} onClick={addMessage}>send</button>
            </div>
        </div>
    )
}

export default ChatPage
