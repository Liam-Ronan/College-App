import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../Config/api';
import React from 'react'
import DeleteButton from '../../Components/DeleteButton';
import Tagline from '../../Components/Tagline';


const Show = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [lecturer, setLecturer] = useState(null);

  let token = localStorage.getItem('token');

  useEffect(() => {

    axios.get(`/lecturers/${id}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
      })
      .then(response => {
          const data = response.data.data

          console.log('Single Lecturer data:', data);
          setLecturer(data);
      })
      .catch(error => {
          console.error(`Error: ${error}`);
      })

  }, [id])

  if(!lecturer) {
    return (
      <h2 className='text-center text-3xl p-5 font-bold'>Lecturer data unavailable</h2>
    )
  }

  return (   

        <>
        <div className='max-w-3xl mx-auto mt-22 p-10 m-36 bg-gray-900 rounded-xl shadow-2xl text-white'>
          <h2 className='text-3xl font-bold mb-6 underline underline-offset-8 decoration-[#edb51c]'>Lecturer Details</h2>
          <div className='mb-4'>
            <p className='mb-2'>
              <b>Name:</b> {lecturer.name}
            </p>
            <p className='mb-2'>
              <b>Address:</b> {lecturer.address}
            </p>
            <p className='mb-2'>
              <b>Email:</b> {lecturer.email}
            </p>
            <p className='mb-2'>
              <b>Phone Number:</b> {lecturer.phone}
            </p>
            <hr className='py-1' />
          </div>
          <div className='flex space-x-6'>
            <Link to={`/Lecturers/${id}/Edit`}>
              <button className='bg-blue-500 text-white font-bold py-2 mt-3 px-5 rounded-full'>
                Edit Course
              </button>
            </Link>
              <DeleteButton
                id={lecturer.id}
                resource='lecturers'
                deleteCallback={() => navigate('/lecturers')}
              />
          </div>
      </div>
      <Tagline />
      </>
  )
}

export default Show;
