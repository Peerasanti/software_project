import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'


function Register() {

  const initialValues = {
    username: "",
    password: "",
    fname: "",
    lname: "",
    email: "",
    tel: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
    fname: Yup.string().required(),
    lname: Yup.string().required(),
    email: Yup.string().required(),
    tel: Yup.string().required(),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1> This is Register page </h1>
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form>
            <label>User name: </label>
            <Field 
              autocomplete='off'
              id='inputCreateser' 
              name='username' 
              placeholder='(Enter username)' 
            />
            <label>Password: </label>
            <Field 
              autocomplete='off'
              id='inputCreateser' 
              name='password' 
              placeholder='(Enter password)' 
            />
            <label>First name: </label>
            <Field 
              autocomplete='off'
              id='inputCreateser' 
              name='fname' 
              placeholder='(Enter first name)' 
            />
            <label>Last name: </label>
            <Field 
              autocomplete='off'
              id='inputCreateser' 
              name='lname' 
              placeholder='(Enter Last name)' 
            />
            <label>Email: </label>
            <Field 
              autocomplete='off'
              id='inputCreateser' 
              name='email' 
              placeholder='(Enter email)' 
            />
            <label>Telephone number: </label>
            <Field 
              autocomplete='off'
              id='inputCreateser' 
              name='tel' 
              placeholder='(Enter telephone number..)' 
            />

            <button type='submit'> Create User </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register
