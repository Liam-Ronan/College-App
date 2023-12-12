import axios from '../../Config/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import Tagline from '../../Components/Tagline';

const Create = () => {

  const Popup = ({ message, onClose }) => (
    <div className="popup bg-[#edb51c] p-5 w-full">
      <h1 className='font-light text-4xl text-white font-bold'>{message}</h1>
    </div>
  );

    const [showPopup, setShowPopup] = useState(false);

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
        let timeoutId;

        axios.post('/lecturers', form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
          setShowPopup(true)

          timeoutId = setTimeout(() => {
            setShowPopup(false);
            navigate('/lecturers');
          }, 3000);
        })
        .catch(err => {
          console.error('Error Response:', err.response);
        });
      
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
    <div className='p-8 bg-gray-900 text-white'>

    <h1 className='text-center font-semibold text-[24px] py-5 text-white'>{showPopup && <Popup message="Lecturer Created" onClose={closePopup} />}</h1>

    <h2 className='text-center p-3 text-4xl font-medium'>Create<strong className='font-colour font-bold'> Lecturer</strong></h2>
    <div className='flex justify-center items-center'> 
      <form className='w-1/2' onSubmit={submitForm}>

          <div className='mb-4 text-gray-900 text-lg font-semibold text-white mb-2 font-sans w-full'>
            
              <h2 className='ml-3 p-2'>Name: </h2>

              <input 
                type='text'
                className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50 text-black' 
                onChange={handleForm} 
                value={form.name} 
                name='name'
              />
              
              <span style={errorStyle}>{errors.name?.message}</span>
           
          </div>

          <div className='mb-4 text-gray-900 text-lg font-semibold text-white  mb-2 p-2 font-sans'>
           
              <h2 className='ml-3 p-2'>Address: </h2>

               <input 
                type='text' 
                className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50 text-black' 
                onChange={handleForm} 
                value={form.address} 
                name='address'
               />
               
               <span style={errorStyle}>{errors.address?.message}</span>
            
          </div>
         
          <div className='mb-4 text-gray-900 text-lg font-semibold text-white  mb-2 p-2 font-sans'>
          
              <h2 className='ml-3 p-2'>Email:</h2>
               <input 
                type='email' 
                className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50 text-black' 
                onChange={handleForm} 
                value={form.email}
                name='email'
               />
              
              <span style={errorStyle}>{errors.email?.message}</span>
         
          </div>

          <div className='mb-4 text-gray-900 text-lg font-semibold text-white  mb-2 p-2 font-sans'>
            
          <h2 className='ml-3 p-2'>Phone:</h2>
               <input 
                type='text' 
                className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50 text-black' 
                onChange={handleForm} 
                value={form.phone} 
                name='phone'
               />
               
               <span style={errorStyle}>{errors.phone?.message}</span>
            
          </div>

          <div className='text-center flex justify-center pt-5'>
            <input className='bg-[#edb51c] text-white font-bold py-2 mb-5 px-10 rounded-full cursor-pointer' type='submit' />
          </div>
          
      </form>
    </div>
  </div>
  <Tagline />
  </>
  )
}

export default Create;
