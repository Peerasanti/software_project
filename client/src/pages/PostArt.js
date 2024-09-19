import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PreviewImage from '../helper/PreviewImage';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PostArt() {

  const [ category, setCategory ] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/category').then((response) => {
      setCategory(response.data);
    });
  }, []);

  let navigate = useNavigate();
  
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
    onSubmit: async () => {
      console.log(formik.values);
      axios.post("http://localhost:3001/art", formik.values, 
      {
        headers: {
          accessToken: localStorage.getItem('accessToken')
        },
      }
    ).then((response) => {
      if(response.data.error) {
        alert('You Should Log In First');
        console.log(response.data.error);
      } else {
        console.log(formik.values);
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
      <label> Category: </label>
      {/* <select 
        name='category'
        placeholder='Select Art Style'
        options={[
          {}
        ]}
        value={category}
        onChange={(event) => formik.setFieldValue('category', event.target.value)}>
      </select> */}
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
