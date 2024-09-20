import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';

function AddCategory() {

  const [ newCategory, setNewCategory ] = useState("");

  const formik = useFormik({
    initialValues: {
        categoryName: ""
    },
    onSubmit: async () => {
        axios.post('http://localhost:3001/category', formik.values).then((response) => {
            if(response.data.error) {
                console.log(response.data.error);
            } else {
                console.log(formik.values);
                setNewCategory("");
            }
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label> Add Category: </label>
        <input
            type='text'
            name='categoryName'
            placeholder='Add Category'
            autoComplete='off'
            onChange={(event) => formik.setFieldValue('categoryName', event.target.value)}
        />
        <button type='submit'> Add </button>
      </form>
    </div>
  )
}

export default AddCategory
