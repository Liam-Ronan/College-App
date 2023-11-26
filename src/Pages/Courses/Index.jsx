import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../Config/api';
import { useAuth } from '../../Contexts/AuthContext';

const Index = () => {

    const { authenticated } = useAuth();

    const [courses, setCourses] = useState([]);

    useEffect(() => {

        console.log("hello");

        axios.get('/courses')
             .then(response => {
                console.log(response.data);
                setCourses(response.data);
             })
             .catch(error => {
                console.error(error);
             })
    }, []);

    // {(courses.length === 0) ? <h3>There are no Courses</h3> : null}
    
    const coursesList = courses.map(course => {
        return (
            <div key={course.id}>

                {(authenticated) ? (
                    <p><b>Title: </b> <Link to={`/courses/${course.id}`}>{course.title}</Link></p>
                ) : (
                    <p><b>Title: </b> {course.title}</p>
                )}
                
                <p><b>Description: </b> {course.description}</p>
                {/* {(authenticated) ? (
                    <DeleteBtn resource="festivals" id={festival._id} deleteCallback={removeFestival} />
                ) : ""} */}
                
                <hr />
            </div>
        )
    })

    return (
        <>
           <h2>List Of Courses</h2>
            { coursesList }
        </>
    )
}

export default Index