import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';
import EnrolmentCard from "../../Components/EnrolmentCard";
import Tagline from "../../Components/Tagline";

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

    const enrolmentsList = enrolments.map((enrolment) => (
        <div key={enrolment.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-8 p-8">
        <EnrolmentCard
          enrolment={enrolment}
          authenticated={authenticated}
        />
      </div>
    ));
  
    return (
      <>
        <div className="container mx-auto p-8">
          <h2 className="text-3xl text-center font-bold mb-6 py-3">All Enrolments</h2>
  
          <div className="flex justify-center">
            <p className="text-xl text-center font-bold mb-6 max-w-3xl">
              Enrolments at our college app offer a seamless and user-friendly experience for students eager to embark on their educational journey. The enrolment process is designed to be intuitive, allowing prospective students to easily browse through an array of courses, explore detailed program information, and enroll in their chosen courses with just a few clicks.
            </p>
          </div>
  
          <Link to="/Enrolments/Create" className="text-[#edb51c] font-medium mb-6 block">
            <button className='bg-[#edb51c] text-white font-bold ml-10 py-2 mb-5 px-5 rounded-full'>
              Create An Enrolment
            </button>
          </Link>
  
          <div className="flex flex-wrap -mx-4">
            {enrolmentsList}
          </div>
        </div>
        <Tagline />
      </>
    );
}

export default Index;
