import React from 'react';
import { Link } from 'react-router-dom';

import kidsSVG from '../Assets/Cartoons/Kids.svg';

// Icons
import { IoSchool } from 'react-icons/io5';
import { IoCodeSlash } from 'react-icons/io5';
import { FaAddressBook } from 'react-icons/fa';

const Tagline = () => {
  return (
    <div className='bg-slate-900 flex items-center gap-32 p-32'>

      <div className='h-1/2 w-1/2 object-cover'>
        <img src={kidsSVG} alt="Kids" />
      </div>

      <div className='text-start mx-6'>
        <h1 className='text-3xl font-light text-white mb-4 pb-3'>
          Discover <strong className='font-colour font-bold'>Powerful Features</strong> Tailored for Your Experience
        </h1>
        <p className='text-white mb-6 max-w-2xl font-light text-xl pb-3'>
          Our web app simplifies learning, making it a breeze for users to explore and excel in their educational journey. Discover a delightful learning experience with our user-friendly platform.
        </p>
        <div className='flex justify-around text-8xl text-[#edb51c] p-5 text-center'>

          <Link to={'/Courses'} className='flex flex-col items-center'>
            <div className='outline-double p-5 rounded-xl'>
              <IoSchool />
              <h3 className='text-white font-medium text-2xl py-5'>Courses</h3>
            </div>
          </Link>

          <Link to={'/Lecturers'} className='flex flex-col items-center'>
            <div className='outline-double p-5 rounded-xl'>
              <IoCodeSlash />
              <h3 className='text-white font-medium text-2xl py-5'>Lecturers</h3>
            </div>
          </Link>

          <Link to={'/Enrolments'} className='flex flex-col items-center'>
            <div className='outline-double p-5 rounded-xl'>
              <FaAddressBook className='ml-5' />
              <h3 className='text-white font-medium text-2xl py-5'>Enrollments</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tagline;
