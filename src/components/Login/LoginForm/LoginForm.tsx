import React from 'react';
import  {InjectedFormProps, reduxForm, Field} from 'redux-form';
import {Input} from '../../../common/FormsControl/FormsControl';
import {required} from '../../../utils/validators/validators';
import s from '../../../common/FormsControl/FormControl.module.css'

type LoginFormOwnProps = {
    // captcha: string | null
}
export type LoginFormValuesType = {
    email: string | null
    password: string | null
    rememberMe: boolean
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={"email"} component={Input}
                       validate={[required]} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'}
                       component={Input} validate={[required]} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Input}
                       validate={[required]} /> remember me
            </div>
            {props.error && <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormValuesType & LoginFormOwnProps>({form: 'login'})(LoginForm)

export default LoginReduxForm
