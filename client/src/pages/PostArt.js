import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function PostArt() {

  
  const formik = useFormik({
    initialValues: {
      img: "",
      title: "",
      price: 0,
      size: "",
      desciption: "",
    },
    validationSchema: Yup.object().shape({
      img: Yup.mixed().required(),
      title: Yup.string().required(),
      price: Yup.number().required(),
      size: Yup.string().required(),
      desciption: Yup.string().required(),
    }),
    onSubmit: () => {
      console.log('Post Success');
      axios.post("http://localhost:3001/art", formik.values).then(() => {
        console.log(formik.values);
      });
    },
  })

  return (
    <div>
     <form onSubmit={formik.handleSubmit}>
      <label> Image: </label>
      <input
        id='inputCreateArt'
        type='file'
        accept='image/*'
        name='img'
        onChange={(event) => formik.setFieldValues('img', event.target.files[0])}
      />
      <label> Title: </label>
      <input
        id='inputCreateArt' 
        name='title' 
        placeholder='(insert title...)'
      />
      <label> Price: </label>
      <input
        id='inputCreateArt' 
        name='price' 
        placeholder='(insert price...)'
      />
      <label> Size: </label>
      <input
        id='inputCreateArt' 
        name='size' 
        placeholder='(size...)'
      />
      <label> Desciption: </label>
      <input
        id='inputCreateArt' 
        name='desciption' 
        placeholder='(desciption...)'
      />

      <button type='submit'> Post </button>
     </form>
    </div>
  );
};

export default PostArt;
