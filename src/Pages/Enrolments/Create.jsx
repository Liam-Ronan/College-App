import axios from '../../Config/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'
import Tagline from '../../Components/Tagline';
import Popup from '../../Components/Popup';

const Create = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
      axios
        .get('/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          setCourses(data);
        })
        .catch((error) => {
          console.error(error);
        });

        axios
        .get('/lecturers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          console.log(data);
          setLecturers(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    const errorStyle = {
      color: 'red'
    };

    const [form, setForm] = useState({
        date: "",
        time: "",
        status: "",
        course_id: "",
        lecturer_id: "",
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

    if(isRequired(['date', 'time', 'status', 'course_id', 'lecturer_id'])){
        let token = localStorage.getItem('token');
        let timeoutId;

        axios.post('/enrolments', form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
          setShowPopup(true);

          timeoutId = setTimeout(() => {
            setShowPopup(false);
            navigate('/Enrolments');
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
      <div className='p-8 bg-gray-900'>

      <h1 className='flex justify-center text-[24px] p-5 text-white'>
          {showPopup && <Popup message={`Enrolment Created`} onClose={closePopup} />}
      </h1>

      <h2 className='text-center p-3 text-4xl font-medium text-white'>Create<strong className='font-colour font-bold'> Enrolment</strong>
      </h2>

      <div className='flex justify-center items-center'> 
        <form className='w-1/2' onSubmit={submitForm}>

            <div className='mb-4 text-white text-lg mb-2 font-semibold font-sans w-full'>
              
                <h2 className='ml-3 p-2'>Date: </h2>
                <input 
                    type='date' 
                    className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50' 
                    onChange={handleForm} 
                    value={form.date} 
                    name='date'
                  />
                
                <span style={errorStyle}>{errors.date?.message}</span>
             
            </div>

            <div className='mb-4 text-white text-lg mb-2 font-semibold p-2 font-sans'>
             
                <h2 className='ml-3 p-2'>Time: </h2>
                 <input 
                    type='time' 
                    className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50' 
                    onChange={handleForm} 
                    value={form.time} 
                    name='time'
                  />
                 
                 <span style={errorStyle}>{errors.time?.message}</span> 
            </div>
           
            <div className='mb-4 text-white text-lg mb-2 font-semibold p-2 font-sans'>
            
                <h2 className='ml-3 p-2'>Status:</h2>

                <select
                  className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                  onChange={handleForm}
                  value={form.status}
                  name='status'
                >
                <option value='' disabled>
                  Select status
                </option>
                <option value='interested'>interested</option>
                <option value='career_break'>Career break</option>
                <option value='associate'>associate</option>
                <option value='assigned'>assigned</option>

              </select>

              <span style={errorStyle}>{errors.status?.message}</span>
            </div>

            <div className='mb-4 text-white text-lg mb-2 font-semibold p-2 font-sans'>
              
            <h2 className='ml-3 p-2'>Course:</h2>
            <select
                className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                onChange={handleForm}
                value={form.course_id}
                name='course_id'
              >
                <option value='' disabled>
                  Select Course
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
    
              </select>
                 
                 <span style={errorStyle}>{errors.course_id?.message}</span>
              
            </div>
           

            <div className='mb-4 text-white text-lg mb-2 font-semibold p-2 font-sans'>
              
            <h2 className='ml-3 p-2'>Lecturer:</h2>
            <select
                className='w-full p-3 text-black border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                onChange={handleForm}
                value={form.lecturer_id}
                name='lecturer_id'
              >
                <option value='' disabled>
                  Select Lecturer
                </option>
                {lecturers.map((lecturer) => (
                  <option key={lecturer.id} value={lecturer.id}>
                    {lecturer.name}
                  </option>
                ))}
    
              </select>
                
                <span style={errorStyle}>{errors.lecturer_id?.message}</span>
              
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
