import React from 'react'
import { Link } from 'react-router-dom';

const EditCourseButton = ({ course }) => {
  return (
    <>
        <Link to={`/Courses/${course.id}/Edit`}>
            <button className="bg-[#edb51c] text-white font-bold py-2 mt-3 px-5 rounded-full cursor-pointer">
            Edit Course
            </button>
        </Link>
    </>
  )
}

export default EditCourseButton