import React from 'react'
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'


function Register() {

  const initialValues = {
    username: "",
    password: "",
    email: "",
    tel: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(4).max(16).required(),
    password: Yup.string().min(4).max(20).required(),
    email: Yup.string().required(),
    tel: Yup.string().required(),
    address: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div>
      <h1> This is Register page </h1>
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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
              type='password'
              id='inputCreateser' 
              name='password' 
              placeholder='(Enter password)' 
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
            <label>Address: </label>
            <Field 
              autocomplete='off'
              id='inputCreateser' 
              name='address' 
              placeholder='(Enter address..)' 
            />

            <button type='submit'> Create User </button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register
