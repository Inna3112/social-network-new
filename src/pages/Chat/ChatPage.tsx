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
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('CLOSE WS')
            setInterval(createChannel, 3000)
        }

        function createChannel() {
            //на тот случай если оборвется соединение
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)

        }

        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}
const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            // console.log(JSON.parse(e.data))
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener('message', messageHandler)
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

    return (
        <div style={{height: 400, overflowY: 'auto'}}>
            {messages.map((m: ChatMessageType, index) => <Message key={index} message={m}/>)}
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
const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'open'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('open')
        };
        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])

    const addMessage = () => {
        wsChannel?.send(message)
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
                <button disabled={wsChannel === null || readyStatus === 'pending'} onClick={addMessage}>send</button>
            </div>
        </div>
    )
}

export default ChatPage
