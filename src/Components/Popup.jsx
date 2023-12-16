// Popup.js
import React from 'react';

const Popup = ({ message }) => (
  <div className="popup bg-[#edb51c] p-5 w-1/2 rounded-full flex justify-center">
    <h1 className='text-4xl text-white font-bold'>{message}</h1>
  </div>
);

export default Popup;
