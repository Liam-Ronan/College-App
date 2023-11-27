import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';

const Index = () => {

    const { authenticated } = useAuth();
    const token = localStorage.getItem('token');

    const [courses, setCourses] = useState([]);

    useEffect(() => {

        console.log("hello");

        axios.get('/courses', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
             .then(response => {
                const data = response.data.data
                console.log(data);
                setCourses(data);
             })
             .catch(error => {
                console.error(error);
             })
    }, []);

    {(courses.length === 0) ? <h3>There are no Courses</h3> : null}
 
    const coursesList = courses.map(course => {
        return (
            <div key={course.id}>

                {(authenticated) ? (
                    <p><b>Title: </b> <Link to={`/courses/${course.id}`}>{course.title}</Link></p>
                ) : (
                    <p><b>Title: </b> {course.title}</p>
                )}
          

                <p><b>Description: </b> {course.description}</p>

                <hr />
            </div>
        )
    })

    return (
        <>
            <h2>Courses List</h2>
            {coursesList}
        </>
    );
    
}

export default Index