import React from 'react';
import {addMessageAC, DialogsType, MessagesType, updateNewMessageBodyAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


type MapStateToPropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
}
type MapDispatchToPropsType = {
    addMessage: () => void
    updateNewMessageBody: (body: string) => void
}
type OwnPropsType = {

}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType
// const DialogsContainer: React.FC<PropsType> = (props) => {
//     const addMessage = () => {
//         props.dispatch(addMessageAC())
//     }
//     const updateNewMessageText = (body: string) => {
//         props.dispatch(updateNewMessageBodyAC(body))
//     }
//
//     return <Dialogs dialogsPage={props.dialogsPage}
//                     addMessage={addMessage}
//                     updateNewMessageBody={updateNewMessageText}/>
// }

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        newMessageBody: state.dialogsPage.newMessageBody
    }
}

const mapDispatchToProps = (dispatch:(action: any) => void): MapDispatchToPropsType => {
    return {
        addMessage: () => dispatch(addMessageAC()),
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyAC(body))
    }
}
const DialogsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;