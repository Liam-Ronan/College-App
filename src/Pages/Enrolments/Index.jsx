import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';
import EnrolmentCard from "../../Components/Enrolments/EnrolmentCard";
import Tagline from "../../Components/Tagline";
import CreateEnrolmentButton from "../../Components/Enrolments/CreateEnrolmentButton";
import EnrolmentText from "../../Components/Enrolments/EnrolmentText";

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

            <EnrolmentText />
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
