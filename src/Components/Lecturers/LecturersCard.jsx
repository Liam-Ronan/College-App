import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from '../DeleteButton';
import EditLecturerButton from './EditLecturerButton';

const CourseCard = ({ lecturers, authenticated }) => {
  return (
    <>

      {lecturers.map((lecturer)=> (

          <div key={lecturer.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-8 p-8">

            <div className="bg-gradient-to-r from-blue-800 to-blue-400 p-6 mb-2 rounded-2xl w-full h-full">

              {authenticated ? (
                <p className="mb-2 text-white font-medium text-2xl pb-2">
                  <Link to={`/lecturers/${lecturer.id}`}>{lecturer.name}</Link>
                </p>
              ) : (
                <p className="mb-2 text-white font-medium">{lecturer.name}</p>
              )}

              <p className="text-white pb-3 font-light">
                {lecturer.email}
              </p>

              <hr className="border-t-2 border-gray-200 mb-3 mt-3" />

              <div className="flex flex-gap gap-4">
                  <EditLecturerButton
                    lecturer={lecturer}
                  />
                  <DeleteButton
                      id={lecturer.id}
                      resource="lecturers"
                      enrolments={lecturer.enrolments}
                  />
              </div>

            </div>

          </div>

      ))}

    </>

  
  );
};

export default CourseCard;
