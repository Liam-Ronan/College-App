
import React from 'react'
import { FaAddressBook } from 'react-icons/fa';

const EnrolmentText = () => {
  return (
    <>
        <div className='flex justify-center'>
            <FaAddressBook className='outline-double text-8xl p-3 rounded-xl  font-colour m-8' />
        </div>
        <h2 className="text-4xl text-center font-medium mb-3 py-3 text-white">All <strong className='font-colour underline underline-offset-8 '>Enrolments</strong></h2>

        <div className='flex justify-center'>
            <p className='text-white text-2xl text-center font-light mb-6 max-w-4xl'>
            Enrolments at our college app offer a seamless and user-friendly experience for students eager to embark on their educational journey. The enrolment process is designed to be intuitive, allowing prospective students to easily browse through an array of courses, explore detailed program information, and enroll in their chosen courses with just a few clicks.
            </p>
        </div>
    </>
  )
}

export default EnrolmentText