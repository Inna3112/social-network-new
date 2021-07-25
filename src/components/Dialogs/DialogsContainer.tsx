import React, {ComponentType} from 'react';
import {
    addMessageAC,
    DialogsType,
    MessagesType
} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../HOC/withAuthRedirect';
import {compose} from "redux";


type MapStatePropsType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
type MapDispatchPropsType = {
    addMessage: (newMessageBody: string) => void
}
type OwnPropsType = {

}
export type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


const mapStateToProps = (state: AppStateType)
    : MapStatePropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

const mapDispatchToProps = (dispatch:(action: any) => void): MapDispatchPropsType => {
    return {
        addMessage: (newMessageBody: string) => dispatch(addMessageAC(newMessageBody)),
    }
}
export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

// const AuthRedirectComponent = withAuthRedirect(Dialogs)
// const DialogsContainer = connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
// (mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
//
// export default DialogsContainer;