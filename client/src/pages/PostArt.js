import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PreviewImage from '../helper/PreviewImage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PostArt() {

  let navigate = useNavigate();
  const [ img, setImg ] = useState("");
  
  const formik = useFormik({
    initialValues: {
      img: "",
      title: "",
      price: 0,
      size: "",
      desciption: "",
    },
    validationSchema: Yup.object().shape({
      img: Yup.mixed().required('Image is required'),
      title: Yup.string().required('Title is required'),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      size: Yup.string().required('Size is required'),
      desciption: Yup.string().required('Description is required'),
    }),


    onSubmit: async () => {
      const formdata = new FormData();
      formdata.append('img', formik.values.img);
      formdata.append('title', formik.values.title);
      formdata.append('price', formik.values.price);
      formdata.append('size', formik.values.size);
      formdata.append('desciption', formik.values.desciption);
      await axios.post("http://localhost:3001/art", formdata, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          accessToken: localStorage.getItem('accessToken'),
        },
      }
    ).then((response) => {
      if(response.data.error) {
        alert('You Should Log In First');
        console.log(response.data.error);
      } else {
        console.log('Uploaded Image:', formik.values.img);
        navigate("/success");
      }
      });
    },
  })

  return (
    <div>
     <form onSubmit={formik.handleSubmit}>
      <label> Image: </label>
      <input
        id='img'
        type='file'
        accept='image/*'
        name='img'
        onChange={(event) => formik.setFieldValue('img', event.target.files[0])}
      />
      <label> Title: </label>
      <input
        type='text'
        name='title' 
        placeholder='(insert title...)'
        onChange={(event) => formik.setFieldValue('title', event.target.value)}
      />
      <label> Price: </label>
      <input
        type='number'
        name='price' 
        placeholder='(insert price...)'
        onChange={(event) => formik.setFieldValue('price', event.target.value)}
      />
      <label> Size: </label>
      <input
        type='text'
        name='size' 
        placeholder='(size...)'
        onChange={(event) => formik.setFieldValue('size', event.target.value)}
      />
      <label> Desciption: </label>
      <input
        type='text'
        name='desciption' 
        placeholder='(desciption...)'
        onChange={(event) => formik.setFieldValue('desciption', event.target.value)}
      />

      <button type='submit'> Post </button>
     </form>
     {formik.values.img && <PreviewImage file={formik.values.img}/>}
    </div>
  );
};

export default PostArt;
