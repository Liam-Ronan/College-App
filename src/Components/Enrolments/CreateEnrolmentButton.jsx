
import React from 'react'
import { Link } from 'react-router-dom'

const CreateEnrolmentButton = () => {
  return (
    <>
        <Link to="/Enrolments/Create" className='flex justify-center'>
            <button className='bg-[#edb51c] text-white font-bold py-2 mb-5 mt-5 px-6 rounded-full'>
              Create An Enrolment
            </button>
        </Link>
    </>
  )
}

export default CreateEnrolmentButton