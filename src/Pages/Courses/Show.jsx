import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../Config/api';
import React from 'react'
import DeleteButton from '../../Components/DeleteButton';

const Show = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  let token = localStorage.getItem('token');

  useEffect(() => {

    axios.get(`/courses/${id}`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
      })
      .then(response => {
          const data = response.data.data

          console.log('Course data:', data);
          setCourse(data);
      })
      .catch(error => {
          console.error(`Error: ${error}`);
      })

  }, [id])

  if(!course) {
    return (
      <h2>Course data unavailable</h2>
    )
  }

  return (
    <>
        
            <h2>Course</h2>
            <div>
                <p><b>Title: </b> {course.title}</p>
                <p><b>Description: </b> {course.description}</p>
                <p><b>Code: </b> {course.code.toUpperCase()}</p>
                <p><b>Level: </b> {course.level}</p>
                <p><b>Points: </b> {course.points}</p>
                <Link to={`/Courses/${id}/Edit`}>
                  <button className='bg-blue-500 text-white font-bold py-2 mt-3 px-5 rounded-full'>
                    Edit Course
                  </button>
                </Link>
                <DeleteButton id={course.id} resource="courses" deleteCallback={() => navigate('/courses')} /> 
            </div>
        
    </>
  )
}

export default Show;
