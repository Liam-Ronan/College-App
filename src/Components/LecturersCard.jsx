import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const CourseCard = ({ lecturer, authenticated, handleDeleteCallback }) => {
  return (
    
      <div className="bg-gray-900 p-6 mb-2 rounded-2xl w-full h-full">
        {authenticated ? (
          <p className="mb-2 text-blue-500 font-medium">
            <Link to={`/lecturers/${lecturer.id}`}>{lecturer.name}</Link>
          </p>
        ) : (
          <p className="mb-2 text-white font-medium">{lecturer.name}</p>
        )}

        <p className="text-white mb-4 font-light">
          {lecturer.email}
        </p>

        <hr className="border-t-2 border-gray-200 mb-3 mt-3" />

        <div className="flex flex-gap gap-4">
            <Link to={`/Lecturers/${lecturer.id}/Edit`}>
                <button className="bg-blue-500 text-white font-bold py-2 mt-3 px-5 rounded-full">
                Edit Lecturer
                </button>
            </Link>
            <DeleteButton
                id={lecturer.id}
                resource="lecturers"
                deleteCallback={handleDeleteCallback}
            />
        </div>
      </div>
  
  );
};

export default CourseCard;
