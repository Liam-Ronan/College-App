import React from 'react';
import educationSVG from "..//Assets/Cartoons/college project-cuate.svg";

const Hero = () => {
  return (
    <div className='bg-gray-900 flex items-center justify-center gap-32 p-32'>
      <div className='text-start mx-6'>
        <h1 className='text-5xl font-light text-white mb-4 pb-3'>
          Unlocking <strong className='font-colour font-bold'>knowledge</strong> effortlessly
        </h1>
        <p className='text-white mb-6 max-w-2xl font-light text-xl pb-3'>
          Our web app simplifies learning, making it a breeze for users to explore and excel in their educational journey. Discover a delightful learning experience with our user-friendly platform.
        </p>
        <button className='bg-[#edb51c] text-white font-bold text-xl p-2 px-4 rounded-full'>
          Learn more
        </button>
      </div>

      <div className='h-1/2 w-1/2 object-cover'>
        <img src={educationSVG} alt="" />
      </div>
    </div>
  );
};

export default Hero;
