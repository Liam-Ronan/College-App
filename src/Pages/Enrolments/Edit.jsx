import axios from '../../Config/api';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react'
import Tagline from '../../Components/Tagline';

const Create = () => {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [enrolments, setEnrolments] = useState([]);

    useEffect(() => {
      axios.get(`/enrolments/${id}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => {
          console.log(response.data.data);

          setEnrolments(response.data.data);
          setForm(response.data.data);
      })
      .catch(err => {
          console.error(err);
      })
    }, [id]);

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

        axios.put(`/enrolments/${id}`, form, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            navigate(`/enrolments/`);
        })
        .catch(err => {
          console.error('Error Response:', err.response);
        });
      
    }
  };

  if(!enrolments) return <h3>Course not found</h3>

  return (
    <div className='p-8 bg-gray-900 text-white'>
      <div className='p-8'>
      <h2 className='text-center p-3 text-4xl font-medium'>Edit<strong className='font-colour font-bold'> Enrolment</strong></h2>
      <div className='flex justify-center items-center'> 
        <form className='w-1/2' onSubmit={submitForm}>

            <div className='mb-4 text-lg font-semibold mb-2 font-sans w-full'>
              
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

            <div className='mb-4 text-lg font-semibold mb-2 p-2 font-sans'>
             
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
           
            <div className='mb-4 text-lg font-semibold mb-2 p-2 font-sans'>
            
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
                <option value='interested'>interested</option>

              </select>

              <span style={errorStyle}>{errors.status?.message}</span>
            </div>

            <div className='mb-4 text-lg font-semibold mb-2 p-2 font-sans'>
              
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
           

            <div className='mb-4 text-lg font-semibold mb-2 p-2 font-sans'>
              
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
    </div>
    
  )
}

export default Create;
