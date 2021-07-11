import React from 'react';
import  {InjectedFormProps, reduxForm, Field} from 'redux-form';
import {LoginFormValuesType} from "../Login";
import {Input} from "../../../common/FormsControl/FormsControl";
import {required} from "../../../utils/validators/validators";

type LoginFormOwnProps = {

}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Login"} name={"login"} component={Input}
                       validate={[required]} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input}
                       validate={[required]} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}
                       validate={[required]} /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormValuesType>({form: 'login'})(LoginForm)

export default LoginReduxForm
