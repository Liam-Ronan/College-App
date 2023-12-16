import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../Config/api';
import React from 'react'

import Tagline from '../../Components/Tagline';
import Popup from '../../Components/Popup';

const Edit = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const [form, setForm] = useState({
      title: "",
      description: "",
      city: "",
      start_date: "",
      end_date: ""
  });

  const errorStyle = {
    color: 'red'
  };

  let token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`/courses/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data.data);

        setCourse(response.data.data);
        setForm(response.data.data);
    })
    .catch(err => {
        console.error(err);
    })
  }, [id]);

  const handleForm = (e) => {
    const {name, value} = e.target;

    let errorMessage = "";

    if (name === "code") {
      // Validate course code using regex (two characters followed by three numbers)
      const codeRegex = /^[A-Za-z]{2}\d{3}$/;
      errorMessage = codeRegex.test(value)
        ? ""
        : "Course code must have two characters followed by three numbers.";
    } 
    else if (name === "points") {
      // Validate points using regex (minimum 100, maximum 625)
      const pointsRegex = /^(?:[1-9]\d{2}|[1-5]\d{2}|6[0-1]\d|625)$/;
      errorMessage = pointsRegex.test(value)
        ? ""
        : "Points must be between 100 and 625.";
    } 
    else if (name === "level") {
      // Validate level using regex (minimum 5, maximum 10)
      const levelRegex = /^(?:[5-9]|10)$/;
      errorMessage = levelRegex.test(value)
        ? ""
        : "Level must be between 5 and 10.";
    }


    setForm(prevState => ({
      ...prevState,
      [name]: value
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: { message: errorMessage },
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
        let timeoutId;

        axios.put(`/courses/${id}`, form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            setShowPopup(true);

            timeoutId = setTimeout(() => {
              setShowPopup(false);
              navigate(`/courses/${id}`);
            }, 5000);
        })
        .catch(err => {
            console.error('Error Response:', err.response);
        });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if(!course) return <h3>Course not found</h3>

  return (
    <div className='p-8 bg-gray-900 text-white'>

      <h1 className='flex justify-center text-[24px] p-5 text-white'>
          {showPopup && <Popup message={`${course.title} Edited`} onClose={closePopup} />}
      </h1>

      <div className='p-8'>
        <h2 className='text-center p-3 text-4xl font-medium'>Edit<strong className='font-colour font-bold'> Course</strong></h2>
        <div className='flex justify-center items-center'> 
            <form className='w-1/2' onSubmit={submitForm}>

              <div className='mb-4 text-lg font-semibold mb-2 font-sans w-full'>
              <h2 className='ml-3 p-2'>Title: </h2>
                  <input 
                    className='w-full p-3 border text-black border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                    type='text' 
                    onChange={handleForm} 
                    value={form.title} 
                    name='title' />
                    
                    <span style={errorStyle}>{errors.title?.message}</span>
              </div>

              <div className='mb-4 text-lg font-semibold mb-2 font-sans w-full'>
              <h2 className='ml-3 p-2'>Code: </h2>
                  <input 
                  className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                    type='text'
                    onChange={handleForm} 
                    value={form.code} 
                    name='code'/>

                    <span style={errorStyle}>{errors.code?.message}</span>
              </div>

              <div className='mb-4 text-lg font-semibold mb-2 font-sans w-full'>
              <h2 className='ml-3 p-2'>Description:</h2>
                  <input 
                  className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                    type='text' 
                    onChange={handleForm} 
                    value={form.description} 
                    name='description'/>

                    <span style={errorStyle}>{errors.description?.message}</span>
              </div>

              <div className='mb-4 text-lg font-semibold mb-2 font-sans w-full'>
              <h2 className='ml-3 p-2'>Points:</h2>
                  <input 
                  className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                    type='text' 
                    onChange={handleForm} 
                    value={form.points} 
                    name='points'/>

                    <span style={errorStyle}>{errors.points?.message}</span>
              </div>

              <div className='mb-4 text-lg font-semibold mb-2 font-sans w-full'>
              <h2 className='ml-3 p-2'>Level:</h2>
                  <input 
                  className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                  type='text' 
                  onChange={handleForm} 
                  value={form.level} 
                  name='level'/>

                  <span style={errorStyle}>{errors.level?.message}</span>
              </div>

              <div className='text-center flex justify-center pt-5'>
                <input className='bg-[#edb51c] text-white font-bold py-2 mb-5 px-10 rounded-full cursor-pointer' type='submit' />
              </div>
            </form>
          </div>
      </div>
      <Tagline />
    </div>
  )
}

export default Edit