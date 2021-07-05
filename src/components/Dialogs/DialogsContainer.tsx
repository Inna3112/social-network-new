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
import {withAuthRedirect} from '../../HOC/withAuthRedirect';
import {compose} from "redux";


type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
}
type MapDispatchPropsType = {
    addMessage: () => void
    updateNewMessageBody: (body: string) => void
}
type OwnPropsType = {

}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
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

const AuthRedirectComponent = withAuthRedirect(Dialogs)

const mapStateToProps = ({dialogsPage} : {dialogsPage: DialogsPageType})
    : MapStatePropsType => {
    return {
        dialogs: dialogsPage.dialogs,
        messages: dialogsPage.messages,
        newMessageBody: dialogsPage.newMessageBody,
    }
}

const mapDispatchToProps = (dispatch:(action: any) => void): MapDispatchPropsType => {
    return {
        addMessage: () => dispatch(addMessageAC()),
        updateNewMessageBody: (body: string) => dispatch(updateNewMessageBodyAC(body))
    }
}
// export default compose(
//     connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
//     (mapStateToProps, mapDispatchToProps),
//     withAuthRedirect
// )(Dialogs)

const DialogsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer;