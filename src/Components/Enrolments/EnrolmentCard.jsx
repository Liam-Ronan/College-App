
import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from '../DeleteButton';
import EditEnrolmentButton from './EditEnrolmentButton';

const EnrolmentCard = ({ enrolments, authenticated }) => {
  return (
    <>
        {enrolments.map((enrolment) => (
            <div key={enrolment.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-8 p-8">

                <div className="bg-gradient-to-r from-blue-800 to-blue-400 p-6 mb-2 rounded-2xl w-full h-full">

                    {(authenticated) ? (
                        <>
                            <p className="mb-2 text-white font-light text-2xl">
                                <b >Course: </b> 
                                    <Link className='text-white font-semibold' to={`/courses/${enrolment.course.id}`}>{enrolment.course.title}
                                </Link>
                            </p>

                            <p className="mb-2 text-white font-light text-2xl pb-2">
                                <b>Lecturer: </b> 
                                    <Link className='text-white font-semibold' to={`/lecturers/${enrolment.lecturer.id}`}>{enrolment.lecturer.name}
                                </Link>
                            </p>

                            <p className="mb-2 text-white font-light text-xl pb-2"><b>Status: {enrolment.status}</b></p>
                        </>
                    ) : (
                        <>
                            <p><b>Course: </b>{enrolment.course.title}</p>
                            <p><b>Lecturer: </b>{enrolment.lecturer.name}</p>
                        </>
                    )}

                    <hr className="border-t-2 border-gray-200 mb-3 mt-3" />

                    <div className="flex flex-gap gap-4">
                        <EditEnrolmentButton
                            enrolment={enrolment}
                        />

                        <DeleteButton
                            id={enrolment.id}
                            resource="enrolments"
                        />
                    </div>


                </div>
            </div> 
        ))} 

    </> 
  )
}

export default EnrolmentCard;