import React from 'react';
import { Link } from 'react-router-dom';
import gradPNG from '../../public/graduation-hat.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white p-10">
      <div className="flex justify-evenly items-center">
        <div className="flex flex-col">
        
            <Link to="/Home" className='flex items-center'>
                <img src={gradPNG} alt="" className="h-16 w-16 p-3" />
                <h1 className='text-2xl text-white font-light pb-2'>Enrolment <strong className='font-colour font-bold pb-1'>EcoSystem</strong></h1>
            </Link>
                        
            <p className="text-sm">123 Corporate Street, Cityville, Country</p>
            <p className="text-sm">info@example.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <a href="/about" className="text-sm mb-2">About Us</a>
          <a href="/services" className="text-sm mb-2">Services</a>
          <a href="/contact" className="text-sm mb-2">Contact Us</a>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <div className="flex justify-evenly items-center">
        <div className="text-sm">&copy; {currentYear} Enrolment Ecosystem. All rights reserved.</div>
        
        <div className="flex space-x-4">
          <a href="/privacy" className="text-sm">Privacy Policy</a>
          <a href="/terms" className="text-sm">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
