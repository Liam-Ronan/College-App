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
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    useEffect(() => {
        axios.get('/enrolments', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
             .then(response => {
                const data = response.data.data

                console.log('Enrolments data:', data);
                setEnrolments(data);
             })
             .catch(error => {
                console.error(error);
             })
    }, [token, showDeletePopup]);

    if(enrolments.length === 0) return <h3>There are no Enrolments</h3>;

    const handleDeleteCallback = (isDeleted) => {
        if (isDeleted) {
          setShowDeletePopup(true);
        }
      };
    
      const closeDeletePopup = () => {
        setShowDeletePopup(false);
      };

    const enrolmentsList = enrolments.map((enrolment) => (
        <div key={enrolment.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 mb-8 p-8">
        <EnrolmentCard
          enrolment={enrolment}
          authenticated={authenticated}
          handleDeleteCallback={handleDeleteCallback}
        />
      </div>
    ));
  
    return (
      <>
        <div className="container mx-auto p-8">
          <h2 className="text-3xl text-center font-bold mb-6 py-3">All Enrolments</h2>
  
          {showDeletePopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
              <div className="bg-white p-6 rounded-md">
                <p className="text-green-500 text-xl font-bold mb-4">
                  Enrolment successfully deleted!
                </p>
                <button
                  onClick={closeDeletePopup}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          )}
  
          <div className="flex justify-center">
            <p className="text-xl text-center font-bold mb-6 max-w-2xl">
              Explore a diverse array of courses designed to ignite curiosity, enhance skills, and foster continuous learning, empowering you to thrive in your educational journey.
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
