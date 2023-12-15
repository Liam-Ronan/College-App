import React from 'react';
import EditCourseButton from './EditCourseButton';
import DeleteButton from '../DeleteButton';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, authenticated }) => {
  return (
    
      <div className="bg-gradient-to-r from-blue-800 to-blue-400 p-6 mb-2 rounded-2xl w-full h-full">
        {authenticated ? (
          <p className="mb-2 text-white font-medium text-2xl pb-2">
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </p>
        ) : (
          <p className="mb-2 text-white font-medium">{course.title}</p>
        )}

        <p className="text-white pb-3 font-light">
          {course.description.substring(0, course.description.length / 2)}...
        </p>

        <hr className="border-t-2 border-gray-200 mb-3 mt-3" />

        <div className="flex flex-gap gap-4">
            <EditCourseButton
              course={course}
            />
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
