import React, { useEffect, useState } from 'react';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';
import { IoSchool } from 'react-icons/io5';

//Import Course Comps
import CreateCourseButton from '../../Components/Courses/CreateCourseButton';
import CourseCard from '../../Components/Courses/CourseCard';

import Tagline from '../../Components/Tagline';


const Index = () => {
    const { authenticated } = useAuth();
    const token = localStorage.getItem('token');
  
    const [courses, setCourses] = useState([]);
    
  
    useEffect(() => {
      axios
        .get('/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          setCourses(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [token, courses]);
  

  
    const coursesList = courses.map((course) => (
        <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-8 p-8">
        <CourseCard
          course={course}
          authenticated={authenticated}    
        />
      </div>
    ));
  
    return (
      <div className='bg-gray-900'>
        <div className="container mx-auto">
        <div className='flex justify-center'>
              <IoSchool className='outline-double text-8xl p-3 rounded-xl  font-colour m-8' />
        </div>
          <h2 className="text-4xl text-center font-medium mb-3 py-3 text-white">All <strong className='font-colour underline underline-offset-8 '>Courses</strong></h2>

          <div className="flex justify-center">
            <p className="text-white text-2xl text-center font-light mb-6 max-w-2xl">
              Explore a diverse array of courses designed to ignite curiosity, enhance skills, and foster continuous learning, empowering you to thrive in your educational journey.
            </p>
          </div>

          <CreateCourseButton />
  
          <div className="flex flex-wrap -mx-4">
            {coursesList}
          </div>
        </div>
        <Tagline />
      </div>
    );
  };
  
  export default Index;
