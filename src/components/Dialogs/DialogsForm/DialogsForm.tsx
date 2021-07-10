import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type DialogsFormValuesType = {
    newMessageBody: string
}
type DialogsFormOwnProps = {

}
const DialogsForm: React.FC<InjectedFormProps<DialogsFormValuesType, DialogsFormOwnProps> & DialogsFormOwnProps> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'textarea'} name={'newMessageBody'} placeholder={'Enter your message'} />
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}
export const DialogsReduxForm = reduxForm<DialogsFormValuesType>({form: 'dialogs'})(DialogsForm)
