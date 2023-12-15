import React from 'react'
import { Link } from 'react-router-dom'

const EditEnrolmentButton = ({ enrolment }) => {
  return (
    <>
        <Link to={`/Enrolments/${enrolment.id}/Edit`}>
            <button className="bg-[#edb51c] text-white font-bold py-2 mt-3 px-5 rounded-full cursor-pointer">
            Edit Enrolment
            </button>
        </Link>
    </>
  )
}

export default EditEnrolmentButton