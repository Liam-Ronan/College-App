import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../Config/api';
import React from 'react'
import DeleteButton from '../../Components/DeleteButton';

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
      <h2>Lecturer data unavailable</h2>
    )
  }

  return (
    <>
        
            <h2>Lecturer</h2>
            <div>
                <p><b>Name: </b> {lecturer.name}</p>
                <p><b>Address: </b> {lecturer.address}</p>
                <p><b>Email: </b> {lecturer.email}</p>
                <p><b>Phone Number: </b> {lecturer.phone}</p>
                <Link to={`/Lecturers/${lecturer.id}/Edit`}>
                  <button className='bg-blue-500 text-white font-bold py-2 mt-3 px-5 rounded-full'>
                    Edit Lecturer
                  </button>
                </Link>
                <DeleteButton id={lecturer.id} resource="lecturers" deleteCallback={() => navigate('/lecturers')} /> 
            </div>
        
    </>
  )
}

export default Show;
