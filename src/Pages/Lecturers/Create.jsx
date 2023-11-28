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
        name: "",
        address: "",
        email: "",
        phone: "",
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

    if(isRequired(['name', 'address', 'email', 'phone'])){
        let token = localStorage.getItem('token');

        axios.post('/lecturers', form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            navigate('/Lecturers');
        })
        .catch(err => {
          console.error('Error Response:', err.response);
        });
      
    }
  };

  return (
    <>
        <h2>Create Lecturer</h2>
        <form onSubmit={submitForm}>

            <div>Name: 
              <input 
                type='text' 
                onChange={handleForm} 
                value={form.name} 
                name='name' />
                
                <span style={errorStyle}>{errors.name?.message}</span>
            </div>

            <div>Address: 
                <input 
                    type='text'
                    onChange={handleForm} 
                    value={form.address} 
                    name='address'/>

                    <span style={errorStyle}>{errors.address?.message}</span>
            </div>

            <div>Email: 
                <input 
                    type='text' 
                    onChange={handleForm} 
                    value={form.email} 
                    name='email'/>

                    <span style={errorStyle}>{errors.email?.message}</span>
            </div>

            <div>Phone: 
                <input 
                    type='text' 
                    onChange={handleForm} 
                    value={form.phone} 
                    name='phone'/>

                    <span style={errorStyle}>{errors.phone?.message}</span>
            </div>

            <input type='submit' />
        </form>
    </>
  )
}

export default Create;
