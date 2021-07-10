import React from 'react';
import s from './Dialogs.module.css';
import Dialog from "./Dialog/Dialog";
import Message from "./Message/Message";
import {DialogsType, MessagesType} from "../../redux/dialogs-reducer";
import {DialogsReduxForm} from "./DialogsForm/DialogsForm";


type PropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
    addMessage: (newMessageBody: string) => void
    updateNewMessageBody: (body:string) => void
    isAuth: boolean
}
const Dialogs: React.FC<PropsType> = (props) => {

    const addNewMessage = (values: {newMessageBody: string}) => {
        props.addMessage(values.newMessageBody)
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
            </div>
            <DialogsReduxForm onSubmit={addNewMessage}/>
        </div>

    )
}

export default Dialogs;