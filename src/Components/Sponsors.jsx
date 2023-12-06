import React from 'react';
import { CompanyLogos } from '../../Constants/index'; 

const Sponsors = () => {
  return (
    <>
    	<div className='p-10 bg-gradient-to-r from-blue-800 to-blue-400 text-center items-center'>
            <div className='p-5'>
                <h2 className='text-center p-5 text-4xl text-white font-bold underline underline-offset-8 decoration-[#edb51c]'>Featured In</h2>
                <div className='flex justify-center text-center p-5'>
                    <p className='text-white flex justify-center text-center font-light text-xl max-w-4xl pb-3'>
                    At the heart of our success lies a network of strong partnerships that fuel our commitment to transformative education. We take pride in collaborating with industry leaders such as Microsoft, Adobe, Coca-Cola, Ford, TikTok, and Disney. These esteemed partnerships not only enrich our platform with diverse educational resources but also ensure that our users receive the highest quality content and support.
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-evenly pb-10 p-10'>
                {CompanyLogos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo.Image}
                        alt={logo.Company}
                        className='bg-[#edb51c] rounded-xl p-5'
                        style={{ maxWidth: `${logo.width}px`, maxHeight: `${logo.height}px` }}
                    />
                ))}
            </div>
            <div className='flex justify-center text-center p-5'>
                    <p className='text-white flex justify-center text-center font-light text-xl max-w-4xl pb-5'>
                    Join us in shaping the future of education – become a valued partner and embark on a collaborative journey toward innovation and excellence.
                    </p>
                </div>
            <button className='bg-[#edb51c] text-white font-bold py-2 mb-10 px-4 rounded-full'>
                 Become a Partner
            </button>
        </div>
    </>


  
  );
};

export default Sponsors;
