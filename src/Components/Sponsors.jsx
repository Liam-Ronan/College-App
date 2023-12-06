import React from 'react';
import { CompanyLogos } from '../../Constants/index'; 

const Sponsors = () => {
  return (
    <div className='p-10 bg-slate-600'>
        <h2 className='text-center p-5 text-2xl font-colour underline underline-offset-6 font-bold'>Featured In</h2>
        <div className='flex items-center justify-evenly'>
            {CompanyLogos.map((logo, index) => (
                <img
                key={index}
                src={logo.Image}
                alt={logo.Company}
                className='h-1/2 w-1/2'
                style={{ maxWidth: `${logo.width}px`, maxHeight: `${logo.height}px` }}
                />
            ))}
        </div>
    </div>

  
  );
};

export default Sponsors;
