import React from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {maxLengthCreator, required} from '../../../../../utils/validators/validators';
import {Textarea} from '../../../../../common/FormsControl/FormsControl';

type PostsFormValuesType = {
    newPostText: string
}
type PostsFormOwnProps = {

}
const maxLength10 = maxLengthCreator(10)
const PostsForm: React.FC<InjectedFormProps<PostsFormValuesType, PostsFormOwnProps> & PostsFormOwnProps> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field component={Textarea} name={'newPostText'}
                   validate={[required, maxLength10]} />
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
export const PostsReduxForm = reduxForm<PostsFormValuesType>({form: 'post'})(PostsForm)
