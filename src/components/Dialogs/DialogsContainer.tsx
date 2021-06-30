import React from 'react';
import {
    addMessageAC,
    DialogsPageType,
    DialogsType,
    MessagesType,
    updateNewMessageBodyAC
} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {AuthStateType} from "../../redux/auth-reducer";


type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
    isAuth: boolean
}
type MapDispatchPropsType = {
    addMessage: () => void
    updateNewMessageBody: (body: string) => void
}
type OwnPropsType = {

}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
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

const mapStateToProps = ({dialogsPage, auth} : {dialogsPage: DialogsPageType, auth: AuthStateType})
    : MapStatePropsType => {
    return {
        dialogs: dialogsPage.dialogs,
        messages: dialogsPage.messages,
        newMessageBody: dialogsPage.newMessageBody,
        isAuth: auth.isAuth,
    }
}

const mapDispatchToProps = (dispatch:(action: any) => void): MapDispatchPropsType => {
    return {
        addMessage: () => dispatch(addMessageAC()),
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyAC(body))
    }
}
const DialogsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
(mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;