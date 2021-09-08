import React from 'react';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {addPost} from '../../../../../redux/profile-reducer';


export const PostsFormWithFormik = () => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            postText: '',
        },
        validate: values => {
            const errors: { postText?: string } = {};
            if (values.postText.length > 10) {
                errors.postText = 'Must be 10 characters or less';
            }
            return errors
        },
        onSubmit: values => {
            dispatch(addPost(values.postText))
            //зачищаем форму
            formik.resetForm()
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <textarea
                      {...formik.getFieldProps('postText')}
                      // name='postText'
                      // onBlur={formik.handleBlur}
                      // onChange={formik.handleChange}
                      // value={formik.values.postText}
            />
            {formik.touched.postText && formik.errors.postText ? <div style={{color: 'red'}}>{formik.errors.postText}</div> : null}
            <div>
                <button type='submit'>Add post</button>
            </div>
        </form>
    )
}

