import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Register.css"


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
    <div className="register-container">
      <h1>Register</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="register-form">
          <label>Username</label>
          <Field 
            type='text'
            name='username' 
            placeholder='Enter username' 
          />
          {/* <ErrorMessage name="username" component="div" className="error" /> */}

          <label>Password</label>
          <Field 
            type='password'
            name='password' 
            placeholder='Enter password' 
          />
          {/* <ErrorMessage name="password" component="div" className="error" /> */}

          <label>Email</label>
          <Field 
            type='email'
            name='email' 
            placeholder='Enter email' 
          />
          {/* <ErrorMessage name="email" component="div" className="error" /> */}

          <label>Telephone Number</label>
          <Field 
            type='tel'
            name='tel' 
            placeholder='Enter telephone number' 
          />
          {/* <ErrorMessage name="tel" component="div" className="error" /> */}

          <label>Address</label>
          <Field 
            type='text'
            name='address' 
            placeholder='Enter address' 
          />
          {/* <ErrorMessage name="address" component="div" className="error" /> */}

          <button type='submit'>Create User</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Register
