import axios from '../../Config/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'

const Create = () => {

    const errorStyle = {
      color: 'red'
    };

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        title: "",
        description: "",
        code: "",
        points: "",
        level: "",
	  });

    const handleForm = (e) => {
      setForm(prevState => ({
          ...prevState,
          [e.target.name]: e.target.value
      }));
    };

    const isRequired = (fields) => {

      let included = true;
      setErrors({});

      fields.forEach(field => {

          if(!form[field]){
              included = false;
              setErrors(prevState => ({
                  ...prevState,
                  [field]: {
                      message: `${field} is required!`
                  }
              }));
          }
          
      });

      return included;
    };

  const submitForm = (e) => {
    e.preventDefault();
    console.log('submitted', form);

    if(isRequired(['title', 'description', 'code', 'points', 'level'])){
        let token = localStorage.getItem('token');

        axios.post('/courses', form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            navigate('/Courses');
        })
        .catch(err => {
          console.error('Error Response:', err.response);
        });
      
    }
  };

  return (
    <>
        <h2>Create Course</h2>
        <form onSubmit={submitForm}>

            <div>Title: <input type='text' onChange={handleForm} value={form.title} name='title'/><span style={errorStyle}>{errors.title?.message}</span></div>

            <div>Code: <input type='text' onChange={handleForm} value={form.code} name='code'/><span style={errorStyle}>{errors.code?.message}</span></div>

            <div>Description: <input type='text' onChange={handleForm} value={form.description} name='description'/><span style={errorStyle}>{errors.description?.message}</span></div>

            <div>Points: <input type='text' onChange={handleForm} value={form.points} name='points'/><span style={errorStyle}>{errors.points?.message}</span></div>

            <div>Level: <input type='text' onChange={handleForm} value={form.level} name='level'/><span style={errorStyle}>{errors.level?.message}</span></div>
            <input type='submit' />
        </form>
    </>
  )
}

export default Create;
