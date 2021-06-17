import React from 'react';
import s from './Message.module.css';


type MessagePropsType = {
    message: string
    id: number
}

const Message: React.FC <MessagePropsType> = (props: MessagePropsType) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
}

export default Message;