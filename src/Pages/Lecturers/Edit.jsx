import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../Config/api';
import React from 'react'
import Tagline from '../../Components/Tagline';

const Edit = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [lecturer, setLecturer] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
      name: "",
      address: "",
      email: "",
      phone: "",
  });

  const errorStyle = {
    color: 'red'
  };

  let token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`/lecturers/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data.data);

        setLecturer(response.data.data);
        setForm(response.data.data);
    })
    .catch(err => {
        console.error(err);
    })
  }, [id]);

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

      axios.put(`/lecturers/${id}`, form, {
          headers: {
              "Authorization": `Bearer ${token}`
          }
      })
      .then(response => {
          navigate(`/lecturers/${id}`);
      })
      .catch(err => {
          console.error(err);
      });
  }
};

  if(!lecturer) return <h3>Lecturer not found</h3>

  return (
    <>
    <div className='p-8'>
      <h2 className='text-center p-3 text-4xl font-medium'>Edit<strong className='font-colour font-bold'> Lecturer</strong></h2>
      <div className='flex justify-center items-center'> 
          <form className='w-1/2' onSubmit={submitForm}>

            <div className='mb-4 text-gray-900 text-lg font-bold font-bold mb-2 font-sans w-full'>
            <h2 className='ml-3 p-2'>Name: </h2>
                <input 
                  className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                  type='text' 
                  onChange={handleForm} 
                  value={form.name} 
                  name='name' />
                  
                  <span style={errorStyle}>{errors.name?.message}</span>
            </div>

            <div className='mb-4 text-gray-900 text-lg font-bold font-bold mb-2 p-2 font-sans'>
            <h2 className='ml-3 p-2'>Address: </h2>
                <input 
                className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                  type='text'
                  onChange={handleForm} 
                  value={form.address} 
                  name='address'/>

                  <span style={errorStyle}>{errors.address?.message}</span>
            </div>

            <div className='mb-4 text-gray-900 text-lg font-bold font-bold mb-2 p-2 font-sans'>
            <h2 className='ml-3 p-2'>Email:</h2>
                <input 
                className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                  type='email' 
                  onChange={handleForm} 
                  value={form.email} 
                  name='email'/>

                  <span style={errorStyle}>{errors.email?.message}</span>
            </div>

            <div className='mb-4 text-gray-900 text-lg font-bold font-bold mb-2 p-2 font-sans'>
            <h2 className='ml-3 p-2'>Phone:</h2>
                <input 
                className='w-full p-3 border border-gray-300 rounded-3xl ring ring-gray-200 ring-opacity-50'
                  type='text' 
                  onChange={handleForm} 
                  value={form.phone} 
                  name='phone'/>

                  <span style={errorStyle}>{errors.phone?.message}</span>
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

export default Edit