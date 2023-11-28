import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';

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

                console.log('Enrolments data:', data);
                setEnrolments(data);
             })
             .catch(error => {
                console.error(error);
             })
    }, []);

    if(enrolments.length === 0) return <h3>There are no Enrolments</h3>;

    const enrolmentsList = enrolments.map(enrolment => {
        return (
            <div key={enrolment.id}>

                {(authenticated) ? (
                    <>
                        <p><b>Course: </b> <Link to={`/courses/${enrolment.course.id}`}>{enrolment.course.title}</Link></p>
                        <p><b>Lecturer: </b> <Link to={`/lecturers/${enrolment.lecturer.id}`}>{enrolment.lecturer.name}</Link></p>
                    </>
                ) : (
                    <>
                        <p><b>Course: </b>{enrolment.course.title}</p>
                        <p><b>Lecturer: </b>{enrolment.lecturer.name}</p>
                    </>
                )}
          

                <p><b>Status: </b> {enrolment.status}</p>
                <Link to={`/Enrolments/${enrolment.id}`}>Enrolment Details</Link>
                <hr />
            </div>
        )
    })

    return (
        <>
            <h2>Enrolments List</h2>
            {/* <Link to="/Lecturers/Create">Create Lecturer</Link> */}
            {enrolmentsList}
        </>
    )
}

export default Index;
