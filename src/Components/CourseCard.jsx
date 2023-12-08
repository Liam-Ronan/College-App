import React from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const CourseCard = ({ course, authenticated }) => {
  return (
    
      <div className="bg-gray-900 p-6 mb-2 rounded-2xl w-full h-full">
        {authenticated ? (
          <p className="mb-2 text-blue-500 font-medium font-colour">
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </p>
        ) : (
          <p className="mb-2 text-white font-medium">{course.title}</p>
        )}

        <p className="text-white mb-4 font-light">
          {course.description.substring(0, course.description.length / 2)}...
        </p>

        <hr className="border-t-2 border-gray-200 mb-3 mt-3" />

        <div className="flex flex-gap gap-4">
            <Link to={`/Courses/${course.id}/Edit`}>
                <button className="bg-blue-500 text-white font-bold py-2 mt-3 px-5 rounded-full">
                Edit Course
                </button>
            </Link>
            <DeleteButton
                id={course.id}
                resource="courses"
                enrolments={course.enrolments}
            />
        </div>
      </div>
  
  );
};

export default CourseCard;
