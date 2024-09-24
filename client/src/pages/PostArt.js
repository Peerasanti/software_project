import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PreviewImage from '../helper/PreviewImage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "../css/PostArt.css"

function PostArt() {

  let navigate = useNavigate();
  const [ img, setImg ] = useState("");
  
  const formik = useFormik({
    initialValues: {
      img: null,
      title: "",
      price: 0,
      size: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      img: Yup.mixed().required('Image is required'),
      title: Yup.string().required('Title is required'),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      size: Yup.string().required('Size is required'),
      description: Yup.string().required('Description is required'),
    }),


    onSubmit: async () => {
      console.log(typeof formik.values.img);
      const formdata = new FormData();
      formdata.append('img', formik.values.img);
      formdata.append('title', formik.values.title);
      formdata.append('price', formik.values.price);
      formdata.append('size', formik.values.size);
      formdata.append('description', formik.values.description);
      await axios.post(`http://localhost:3001/art/${localStorage.getItem('userId')}`, formik.values
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
    <div className="post-art-container">
    <form onSubmit={formik.handleSubmit}>
      <label> Image: </label>
      <input
        id='img'
        type='file'
        accept='image/*'
        name='img'
        onChange={(event) => {
          formik.setFieldValue('img', String(URL.createObjectURL(event.currentTarget.files[0])));
          setImg(event.currentTarget.files[0]);
        }}
      />
      {formik.touched.img && formik.errors.img ? <div className="error">{formik.errors.img}</div> : null}

      <label> Title: </label>
      <input
        type='text'
        name='title' 
        placeholder='(insert title...)'
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      {formik.touched.title && formik.errors.title ? <div className="error">{formik.errors.title}</div> : null}

      <label> Price: </label>
      <input
        type='number'
        name='price' 
        placeholder='(insert price...)'
        value={formik.values.price}
        onChange={formik.handleChange}
      />
      {formik.touched.price && formik.errors.price ? <div className="error">{formik.errors.price}</div> : null}

      <label> Size: </label>
      <input
        type='text'
        name='size' 
        placeholder='(size...)'
        value={formik.values.size}
        onChange={formik.handleChange}
      />
      {formik.touched.size && formik.errors.size ? <div className="error">{formik.errors.size}</div> : null}

      <label> Description: </label>
      <input
        type='text'
        name='description' 
        placeholder='(description...)'
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      {formik.touched.description && formik.errors.description ? <div className="error">{formik.errors.description}</div> : null}

      <button type='submit'> Post </button>
    </form>
    {img && <PreviewImage file={img} />}
  </div>
  );
};

export default PostArt;