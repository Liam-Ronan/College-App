import React from 'react';

const Tagline = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-400 text-white p-16 text-center">
      <h2 className="text-4xl font-bold mb-6">Empowering Minds, <strong className='font-colour font-bold'>Inspiring Futures</strong></h2>
      <p className="text-lg max-w-xl mx-auto mb-8">
        At the intersection of innovation and education, we foster a community where minds are empowered to explore, learn, and create. Our commitment to excellence shapes inspiring futures, unlocking limitless potential for every learner.
      </p>
      <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-800">
        Get Started
      </button>
    </div>
  );
};

export default Tagline;
