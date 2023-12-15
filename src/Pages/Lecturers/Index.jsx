import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';
import { IoCodeSlash } from 'react-icons/io5';

import CreateLecturerButton from '../../Components/Lecturers/CreateLecturerButton';

import Tagline from '../../Components/Tagline';

import LecturersCard from '../../Components/Lecturers/LecturersCard';

const Index = () => {
  const { authenticated } = useAuth();
  const token = localStorage.getItem('token');

  const [lecturers, setLecturers] = useState([]);


  useEffect(() => {
    axios
      .get('/lecturers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setLecturers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token, lecturers]);


  const lecturersList = lecturers.map((lecturer) => (
    <div key={lecturer.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-8 p-8">
    <LecturersCard
      lecturer={lecturer}
      authenticated={authenticated}
    />
  </div>
));

  return (
    <div className='bg-gray-900'>
        <div className="container mx-auto">
        <div className='flex justify-center'>
              <IoCodeSlash className='outline-double text-8xl p-3 rounded-xl  font-colour m-8' />
        </div>
          <h2 className="text-4xl text-center font-medium mb-3 py-3 text-white">All <strong className='font-colour underline underline-offset-8 '>Lecturers</strong></h2>

      <div className='flex justify-center'>
        <p className='text-white text-2xl text-center font-light mb-6 max-w-4xl'>
        Lecturers are the heart of the educational journey, guiding students with wisdom and enthusiasm. Their dedication goes beyond imparting knowledge; it ignites a passion for learning. In classrooms led by these educators, diverse perspectives flourish, and critical thinking becomes second nature..</p>
      </div>

      <CreateLecturerButton />

      <div className="flex flex-wrap mx-4">
        {lecturersList}
      </div>
      
    </div>
    <Tagline />
    </div>
    
    
  );
};

export default Index;
