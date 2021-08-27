import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../../utils/validators/validators";

type DialogsFormValuesType = {
    newMessageBody: string
}
type DialogsFormOwnProps = {

}
const maxLength10 = maxLengthCreator(10)
const DialogsForm: React.FC<InjectedFormProps<DialogsFormValuesType, DialogsFormOwnProps> & DialogsFormOwnProps> = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Textarea} name={'newMessageBody'}
                       placeholder={'Enter your message'}
                       validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Send message</button>
            </div>
        </form>
    )
}
export const DialogsReduxForm = reduxForm<DialogsFormValuesType>({form: 'dialogs'})(DialogsForm)
