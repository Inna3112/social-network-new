import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type PostsFormValuesType = {
    newPostText: string
}
type PostsFormOwnProps = {

}
const PostsForm: React.FC<InjectedFormProps<PostsFormValuesType, PostsFormOwnProps> & PostsFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={'textarea'} name={'newPostText'} />
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
export const PostsReduxForm = reduxForm<PostsFormValuesType>({form: 'post'})(PostsForm)
