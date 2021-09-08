import React from 'react';
import {useFormik} from 'formik';


export const PostsFormWithFormik = () => {
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
            alert(JSON.stringify(values, null, 2))
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

