import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../Config/api';
import React from 'react'


const Show = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolment, setEnrolment] = useState(null);

  let token = localStorage.getItem('token');

  useEffect(() => {

    axios.get(`/enrolments/${id}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
      })
      .then(response => {
          const data = response.data.data

          console.log('Enrolment data:', data);
          setEnrolment(data);
      })
      .catch(error => {
          console.error(`Error: ${error}`);
      })

  }, [id])

  if(!enrolment) {
    return (
      <h2>Enrolment data unavailable</h2>
    )
  }

  return (
    <>
        
            <h2>Enrolment</h2>
            <div>
                <p><b>Date: </b> {enrolment.date}</p>
                <p><b>Time: </b> {enrolment.time}</p>
                <p><b>Course: </b> {enrolment.course.title}</p>
                <p><b>Lecturer: </b> {enrolment.lecturer.name}</p>
                <p><b>Status: </b> {enrolment.status}</p>
                <Link to={`/Enrolments/${id}/Edit`}>Edit</Link>

            </div>
        
    </>
  )
}

export default Show;
