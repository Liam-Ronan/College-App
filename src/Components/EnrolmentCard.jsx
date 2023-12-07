
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const EnrolmentCard = ({ enrolment, authenticated, handleDeleteCallback }) => {
  return (
    <div className="bg-gray-900 p-6 mb-2 rounded-2xl w-full h-full">

        {(authenticated) ? (
            <>
                <p className="mb-2 text-white">
                    <b >Course: </b> 
                        <Link className='text-blue-500' to={`/courses/${enrolment.course.id}`}>{enrolment.course.title}
                    </Link>
                </p>

                <p className="text-white">
                    <b>Lecturer: </b> 
                        <Link className='text-blue-500' to={`/lecturers/${enrolment.lecturer.id}`}>{enrolment.lecturer.name}
                    </Link>
                </p>

                <p className="mb-2 text-white font-medium"><b>Status: {enrolment.status}</b></p>
            </>
        ) : (
            <>
                <p><b>Course: </b>{enrolment.course.title}</p>
                <p><b>Lecturer: </b>{enrolment.lecturer.name}</p>
            </>
        )}

        <hr className="border-t-2 border-gray-200 mb-3 mt-3" />

        <div className="flex flex-gap gap-4">

            <Link to={`/Enrolments/${enrolment.id}/Edit`}>
                <button className="bg-blue-500 text-white font-bold py-2 mt-3 px-5 rounded-full">
                Edit Enrolment
                </button>
            </Link>

            <DeleteButton
                id={enrolment.id}
                resource="enrolments"
                deleteCallback={handleDeleteCallback}
            />

        </div>
      </div>
  )
}

export default EnrolmentCard;