import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/dialogs-reducer";



type PropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
    addMessage: () => void
    updateNewMessageBody: (body:string) => void
}
const Dialogs: React.FC<PropsType> = (props) => {
    const addMessage = () => {
        props.addMessage()
    }
    const updateNewMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(e.currentTarget.value)
    }
    let dialogsElements = props.dialogs.map(d => <Dialog key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = props.messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <textarea value={props.newMessageBody}
                              onChange={updateNewMessageText}/>
                </div>
                <div>
                    <button onClick={addMessage}>Send message</button>
                </div>
            </div>
        </div>

    )
}

export default Dialogs;