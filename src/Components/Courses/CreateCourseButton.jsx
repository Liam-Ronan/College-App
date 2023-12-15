import React from 'react'
import { Link } from 'react-router-dom';

const CreateCourseButton = () => {
  return (
    <>
        <Link to="/Courses/Create" className='flex justify-center'>
            <button className='bg-[#edb51c] text-white font-bold py-2 mb-5 mt-5 px-6 rounded-full'>
              Create A Course
            </button>
        </Link>
    </>
  )
}

export default CreateCourseButton