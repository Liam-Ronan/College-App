import React from 'react'
import { Link } from 'react-router-dom'

const EditLecturerButton = ({ lecturer }) => {
  return (
    <>
        <Link to={`/Lecturers/${lecturer.id}/Edit`}>
            <button className="bg-[#edb51c] text-white font-bold py-2 mt-3 px-5 rounded-full cursor-pointer">
            Edit Lecturer
            </button>
        </Link>
    </>
  )
}

export default EditLecturerButton