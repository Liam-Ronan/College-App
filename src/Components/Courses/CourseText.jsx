import React from 'react'
import { IoSchool } from 'react-icons/io5';

const CourseText = () => {
  return (
    <>
        <div className='flex justify-center'>
              <IoSchool className='outline-double text-8xl p-3 rounded-xl  font-colour m-8' />
        </div>
          <h2 className="text-4xl text-center font-medium mb-3 py-3 text-white">All <strong className='font-colour underline underline-offset-8 '>Courses</strong></h2>

          <div className="flex justify-center">
            <p className="text-white text-2xl text-center font-light mb-6 max-w-2xl">
              Explore a diverse array of courses designed to ignite curiosity, enhance skills, and foster continuous learning, empowering you to thrive in your educational journey.
            </p>
          </div>
    </>
  )
}

export default CourseText