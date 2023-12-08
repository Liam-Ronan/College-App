import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';

import DeleteButton from '../../Components/DeleteButton';
import Tagline from '../../Components/Tagline';

import LecturersCard from '../../Components/LecturersCard';

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
    <>
        <div className="container mx-auto p-8">
      <h2 className="text-3xl text-center font-bold mb-6 py-3">All Lecturers</h2>

      <div className='flex justify-center'>
        <p className='text-xl text-center font-bold mb-6 max-w-4xl'>
        Lecturers are the heart of the educational journey, guiding students with wisdom and enthusiasm. Their dedication goes beyond imparting knowledge; it ignites a passion for learning. In classrooms led by these educators, diverse perspectives flourish, and critical thinking becomes second nature..</p>
      </div>

      <Link to="/Lecturers/Create" className="text-[#edb51c] font-medium mb-6 block">
        <button className='bg-[#edb51c] text-white font-bold ml-10 py-2 mb-5 px-5 rounded-full'>
            Create A Lecturer
        </button>
      </Link>

      <div className="flex flex-wrap mx-4">
        {lecturersList}
      </div>
      
    </div>
    <Tagline />
    </>
    
    
  );
};

export default Index;
