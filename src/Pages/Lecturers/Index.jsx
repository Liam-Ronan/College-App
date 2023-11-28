import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';

const Index = () => {

    const { authenticated } = useAuth();
    const token = localStorage.getItem('token');

    const [lecturers, setlecturers] = useState([]);

    useEffect(() => {
        axios.get('/lecturers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
             .then(response => {
                const data = response.data.data

                console.log('Lecturers data:', data);
                setlecturers(data);
             })
             .catch(error => {
                console.error(error);
             })
    }, []);

    if(lecturers.length === 0) return <h3>There are no Lecturers</h3>;

    const lecturersList = lecturers.map(lecturer => {
        return (
            <div key={lecturer.id}>

                {(authenticated) ? (
                    <p><b>Name: </b> <Link to={`/lecturers/${lecturer.id}`}>{lecturer.name}</Link></p>
                ) : (
                    <p><b>Name: </b> {lecturer.name}</p>
                )}
          

                <p><b>address: </b> {lecturer.address}</p>

                <hr />
            </div>
        )
    })

    return (
        <>
            <h2>Lecturers List</h2>
            <Link to="/Lecturers/Create">Create Lecturer</Link>
            {lecturersList}
        </>
    )
}

export default Index;
