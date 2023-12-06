import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { useAuth } from '../Contexts/AuthContext';


import Hero from '../Components/Hero';
import Sponsors from '../Components/Sponsors';
import Features from '../Components/Features';
import Tagline from '../Components/Tagline';
import Footer from '../Components/Footer';

const Popup = ({ message, onClose }) => (
  <div className="popup">
    <p>{message}</p>
  </div>
);

const Home = () => {
  const { authenticated } = useAuth();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (authenticated) {
      // Display the popup for 5 seconds
      setShowPopup(true);

      // Set a timeout to close the popup after 5 seconds
      timeoutId = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [authenticated]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
    <div className='bg-gray-900'>
    {!authenticated ? (
        <LoginForm />
      ) : (
        <>
          <h1 className='text-center font-semibold text-[24px] py-5 text-white'>{showPopup && <Popup message="You are authenticated" onClose={closePopup} />}</h1>
          <Hero />
          <Sponsors />
          <Features />
          <Tagline />
          <Footer />
        </>
      )}
    </div>
    </>
  );
};

export default Home;
