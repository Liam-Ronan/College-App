import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';
import EnrolmentCard from "../../Components/Enrolments/EnrolmentCard";
import Tagline from "../../Components/Tagline";
import { FaAddressBook } from 'react-icons/fa';
import CreateEnrolmentButton from "../../Components/Enrolments/CreateEnrolmentButton";

const Index = () => {

    const { authenticated } = useAuth();
    const token = localStorage.getItem('token');

    const [enrolments, setEnrolments] = useState([]);

    useEffect(() => {
        axios.get('/enrolments', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
          const data = response.data.data

          // console.log('Enrolments data:', data);
          setEnrolments(data);
        })
        .catch(error => {
          console.error(error);
        })
    }, [token, enrolments]);

    if(enrolments.length === 0) return <h3>There are no Enrolments</h3>;


        
  
  
    return (
      <div className='bg-gray-900'>

        <div className="container mx-auto">

          <div className='flex justify-center'>
                <FaAddressBook className='outline-double text-8xl p-3 rounded-xl  font-colour m-8' />
          </div>
            <h2 className="text-4xl text-center font-medium mb-3 py-3 text-white">All <strong className='font-colour underline underline-offset-8 '>Enrolments</strong></h2>

            <div className='flex justify-center'>
              <p className='text-white text-2xl text-center font-light mb-6 max-w-4xl'>
                Enrolments at our college app offer a seamless and user-friendly experience for students eager to embark on their educational journey. The enrolment process is designed to be intuitive, allowing prospective students to easily browse through an array of courses, explore detailed program information, and enroll in their chosen courses with just a few clicks.
              </p>
            </div>
    
            <CreateEnrolmentButton />
    
            <div className="flex flex-wrap -mx-4">
              <EnrolmentCard
                enrolments={enrolments}
                authenticated={authenticated}
              />
            </div>

        </div>

        <Tagline />
        
      </div>
    );
}

export default Index;
