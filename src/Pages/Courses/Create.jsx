// Create.jsx
import axios from '../../Config/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Popup from '../../Components/Popup'; // Import the Popup component
import Tagline from '../../Components/Tagline';

const Create = () => {
  const [showPopup, setShowPopup] = useState(false);
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
      if (!form[field]) {
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

    if (isRequired(['title', 'description', 'code', 'points', 'level'])) {
      let token = localStorage.getItem('token');
      let timeoutId;

      axios.post('/courses', form, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          setShowPopup(true);

          timeoutId = setTimeout(() => {
            setShowPopup(false);
            navigate('/courses');
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

  return (
    <>
      <div className='p-8 bg-gray-900 text-white'>

        <h1 className='flex justify-center text-[24px] p-5 text-white'>
          {showPopup && <Popup message={`${form.title} Created`} onClose={closePopup} />}
        </h1>

        <h2 className='text-center p-3 text-4xl font-medium'>
          Create<strong className='font-colour font-bold'> Course</strong>
        </h2>
        <div className='flex justify-center items-center'>
          <form className='w-1/2' onSubmit={submitForm}>
            <div className='mb-4 text-lg font-semibold mb-2 font-sans'>
              <h2 className='ml-3 p-2'>Title: </h2>
              <input
                type='text'
                className='w-full p-3 border text-black border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                onChange={handleForm}
                value={form.title}
                name='title'
              />
              <span style={{ color: 'red' }}>{errors.title?.message}</span>
            </div>

            <div className='mb-4 text-lg font-semibold mb-2 p-2 font-sans'>
              <h2 className='ml-3 p-2'>Code: </h2>
              <input
                type='text'
                className='w-full p-3 border text-black border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                onChange={handleForm}
                value={form.code}
                name='code'
              />
              <span style={{ color: 'red' }}>{errors.code?.message}</span>
            </div>

            <div className='mb-4 text-lg font-semibold mb-2 p-2 font-sans'>
              <h2 className='ml-3 p-2'>Description:</h2>
              <input
                type='text'
                className='w-full p-3 border text-black border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                onChange={handleForm}
                value={form.description}
                name='description'
              />
              <span style={{ color: 'red' }}>{errors.description?.message}</span>
            </div>

            <div className='mb-4 text-lg font-semibold mb-2 p-2 font-sans'>
              <h2 className='ml-3 p-2'>Points:</h2>
              <input
                type='text'
                className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                onChange={handleForm}
                value={form.points}
                name='points'
                min="100"
                max="625"
              />
              <span style={{ color: 'red' }}>{errors.points?.message}</span>
            </div>

            <div className='mb-4 text-lg font-semibold mb-2 p-2 font-sans'>
              <h2 className='ml-3 p-2'>Level:</h2>
              <input
                type='text'
                className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                onChange={handleForm}
                value={form.level}
                name='level'
                min="5"
						    max="10"
              />
              <span style={{ color: 'red' }}>{errors.level?.message}</span>
            </div>

            <div className='text-center flex justify-center pt-5'>
              <input className='bg-[#edb51c] text-white font-bold py-2 mb-5 px-10 rounded-full cursor-pointer' type='submit' />
            </div>
          </form>
        </div>
      </div>
      <Tagline />
    </>
  );
};

export default Create;
