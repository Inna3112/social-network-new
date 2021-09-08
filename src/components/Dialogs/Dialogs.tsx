import React from 'react';
import s from './Dialogs.module.css';
import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import {DialogsType, MessagesType} from '../../redux/dialogs-reducer';
import {DialogsFormWithFormik} from "./DialogsForm/DialogsFormWithFormik";


type PropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
    addMessage: (newMessageBody: string) => void
    updateNewMessageBody: (body: string) => void
    isAuth: boolean
}
const Dialogs: React.FC<PropsType> = (props) => {

    const {dialogs, messages, addMessage} = props

    const addNewMessage = (values: { newMessageBody: string }) => {
        addMessage(values.newMessageBody)
        values.newMessageBody = ''
    }
    let dialogsElements = dialogs.map(d => <Dialog key={d.id} name={d.name} id={d.id}/>)
    let messagesElements = messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <DialogsFormWithFormik/>
        </div>

    )
}

export default Dialogs;