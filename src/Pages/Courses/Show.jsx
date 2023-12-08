import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../Config/api';
import DeleteButton from '../../Components/DeleteButton';
import Tagline from '../../Components/Tagline';

const Show = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  let token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setCourse(data);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }, [id]);

  if (!course) {
    return (
      <h2 className='text-center text-3xl p-5 font-bold'>
        Course data unavailable
      </h2>
    );
  }

  return (
    <>
      <div className='max-w-3xl mx-auto mt-10 p-10 mb-16 bg-gray-900 rounded-xl shadow-2xl text-white'>
      <h2 className='text-3xl font-bold mb-6 underline underline-offset-8 decoration-[#edb51c]'>Course Details</h2>
      <div className='mb-4'>
        <p className='mb-2'>
          <b>Title:</b> {course.title}
        </p>
        <p className='mb-2'>
          <b>Description:</b> {course.description}
        </p>
        <p className='mb-2'>
          <b>Code:</b> {course.code.toUpperCase()}
        </p>
        <p className='mb-2'>
          <b>Level:</b> {course.level}
        </p>
        <p className='mb-4'>
          <b>Points:</b> {course.points}
        </p>
        <hr className='py-1' />
      </div>
      <div className='flex space-x-6'>
        <Link to={`/Courses/${id}/Edit`}>
          <button className='bg-blue-500 text-white font-bold py-2 mt-3 px-5 rounded-full'>
            Edit Course
          </button>
        </Link>
          <DeleteButton
            id={course.id}
            resource='courses'
            enrolments={course.enrolments}
          />
      </div>
    </div>
    <Tagline />
    </>
    
  );
};

export default Show;
