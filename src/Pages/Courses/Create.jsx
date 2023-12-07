import axios from '../../Config/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import Tagline from '../../Components/Tagline';

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
      <div className='p-8'>
      <h2 className='text-center p-3 text-4xl font-medium'>Create<strong className='font-colour font-bold'> Course</strong></h2>
      <div className='flex justify-center items-center'> 
        <form className='w-1/2' onSubmit={submitForm}>

            <div className='mb-4 text-gray-900 text-lg font-bold font-bold mb-2 font-sans w-full'>
              
                <h2 className='ml-3 p-2'>Title: </h2>
                <input 
                    type='text' 
                    className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50' 
                    onChange={handleForm} 
                    value={form.title} 
                    name='title'
                  />
                
                <span style={errorStyle}>{errors.title?.message}</span>
             
            </div>

            <div className='mb-4 text-gray-900 text-lg font-bold font-bold mb-2 p-2 font-sans'>
             
                <h2 className='ml-3 p-2'>Code: </h2>
                 <input 
                    type='text' 
                    className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50' 
                    onChange={handleForm} 
                    value={form.code} 
                    name='code'
                  />
                 
                 <span style={errorStyle}>{errors.code?.message}</span>
              
            </div>
           
            <div className='mb-4 text-gray-900 text-lg font-bold font-bold mb-2 p-2 font-sans'>
            
                <h2 className='ml-3 p-2'>Description:</h2>
                 <input 
                    type='text' 
                    className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50' 
                    onChange={handleForm} 
                    value={form.description} 
                    name='description'
                  />

                 <span style={errorStyle}>{errors.description?.message}</span>
           
            </div>

            <div className='mb-4 text-gray-900 text-lg font-bold font-bold mb-2 p-2 font-sans'>
              
            <h2 className='ml-3 p-2'>Points:</h2>
                 <input 
                  type='text' 
                  className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50' 
                  onChange={handleForm} 
                  value={form.points} 
                  name='points'
                 />
                 
                 <span style={errorStyle}>{errors.points?.message}</span>
              
            </div>
           

            <div className='mb-4 text-gray-900 text-lg font-bold font-bold mb-2 p-2 font-sans'>
              
            <h2 className='ml-3 p-2'>Level:</h2>
                <input 
                  type='text' 
                  className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50' 
                  onChange={handleForm} 
                  value={form.level} 
                  name='level'
                />
                
                <span style={errorStyle}>{errors.level?.message}</span>
              
            </div>

            <div className='text-center flex justify-center pt-5'>
              <input className='bg-[#edb51c] text-white font-bold py-2 mb-5 px-10 rounded-full' type='submit' />
            </div>
            
        </form>
      </div>
    </div>
    <Tagline />
    </>
    
  )
}

export default Create;
