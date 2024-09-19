import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {

  let navigate = useNavigate();

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
    tel: Yup.string().min(10).max(10).required(),
    address: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
    navigate("/success");
  };

  return (
    <div>
      <h1> This is Register page </h1>
      <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <label> User name: </label>
            <Field 
              type='text'
              name='username' 
              placeholder='(Enter username)' 
            />
            <label> Password: </label>
            <Field 
              type='password'
              name='password' 
              placeholder='(Enter password)' 
            />
            <label> Email: </label>
            <Field 
              type='text'
              name='email' 
              placeholder='(Enter email)' 
            />
            <label> Telephone number: </label>
            <Field 
              type='text'
              name='tel' 
              placeholder='(Enter telephone number..)' 
            />
            <label> Address: </label>
            <Field 
              type='text'
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
